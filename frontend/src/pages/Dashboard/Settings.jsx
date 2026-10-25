import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig.js";
import { getAuthErrorMessage } from "../../firebase/authErrors.js";
import { useAuth } from "../../context/AuthContext.jsx";
import api, { getApiErrorMessage } from "../../services/api.js";

const Message = ({ status }) =>
  status.message ? (
    <p
      className={`mt-4 text-sm rounded-lg px-4 py-3 border ${
        status.type === "error"
          ? "text-red-700 bg-red-50 border-red-200"
          : "text-green-700 bg-green-50 border-green-200"
      }`}
    >
      {status.message}
    </p>
  ) : null;

const Settings = () => {
  const navigate = useNavigate();
  const { user, profile, setProfile } = useAuth();

  const [username, setUsername] = useState(profile.username);
  const [profileStatus, setProfileStatus] = useState({ type: "", message: "" });
  const [accountStatus, setAccountStatus] = useState({ type: "", message: "" });
  const [deleteStatus, setDeleteStatus] = useState({ type: "", message: "" });
  const [busy, setBusy] = useState("");

  // Google accounts have no Tied password to change
  const hasPassword = user.providerData.some((p) => p.providerId === "password");

  const handleSaveProfile = async () => {
    const value = username.trim().toLowerCase();
    setProfileStatus({ type: "", message: "" });

    if (!/^[a-z0-9_.]{3,30}$/.test(value)) {
      setProfileStatus({ type: "error", message: "Username must be 3–30 characters: letters, numbers, _ or ." });
      return;
    }

    setBusy("profile");

    try {
      const { data } = await api.patch("/users/me", { username: value });
      setProfile(data);
      setUsername(data.username);
      setProfileStatus({ type: "success", message: "Username updated." });
    } catch (err) {
      setProfileStatus({ type: "error", message: getApiErrorMessage(err) });
    } finally {
      setBusy("");
    }
  };

  const handleChangePassword = async () => {
    setBusy("password");
    setAccountStatus({ type: "", message: "" });

    try {
      await sendPasswordResetEmail(auth, user.email);
      setAccountStatus({ type: "success", message: `We sent a password reset link to ${user.email}.` });
    } catch (err) {
      setAccountStatus({ type: "error", message: getAuthErrorMessage(err) });
    } finally {
      setBusy("");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Delete your Tied account? Your profile, links and analytics will be permanently removed.")) {
      return;
    }

    setBusy("delete");
    setDeleteStatus({ type: "", message: "" });

    try {
      // Grab a token first — it stays valid for the API call after the Firebase account is gone
      const token = await user.getIdToken();

      // Deleting the Firebase account first means nothing is lost if Firebase refuses
      await deleteUser(user);
      await api.delete("/users/me", { headers: { Authorization: `Bearer ${token}` } });
      navigate("/");
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setDeleteStatus({
          type: "error",
          message: "For security, please sign out and sign back in, then try deleting your account again.",
        });
      } else {
        setDeleteStatus({
          type: "error",
          message: err.isAxiosError ? getApiErrorMessage(err) : getAuthErrorMessage(err),
        });
      }
      setBusy("");
    }
  };

  return (
    <div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Settings
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your Tied account and profile settings.
        </p>
      </div>


      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8 dark:bg-slate-900 dark:border-slate-700">

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Profile Settings
        </h2>

        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          Manage the information associated with your profile.
        </p>


        {/* Username */}
        <div className="mt-6">

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>

          <div className="flex mt-2">

            <span className="bg-gray-100 border border-gray-200 border-r-0 rounded-l-lg px-3 sm:px-4 py-3 text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-400">
              {window.location.host}/
            </span>

            <input
              type="text"
              aria-label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 min-w-0 p-3 border border-gray-200 rounded-r-lg dark:border-slate-700"
            />

          </div>

        </div>


        {/* Email */}
        <div className="mt-6">

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            aria-label="Email Address"
            value={user.email}
            readOnly
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50 dark:border-slate-700 dark:bg-slate-950"
          />

        </div>


        <Message status={profileStatus} />

        {/* Save */}
        <button
          type="button"
          onClick={handleSaveProfile}
          disabled={busy === "profile" || username === profile.username}
          className="mt-6 bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          {busy === "profile" ? "Saving..." : "Save Changes"}
        </button>

      </div>


      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 dark:bg-slate-900 dark:border-slate-700">

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Account
        </h2>

        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          Manage your account security.
        </p>


        <div className="mt-6 space-y-4">

          {/* Change Password */}
          {hasPassword && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-200 rounded-lg dark:border-slate-700">

            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Password
              </h3>

              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                We'll email you a link to set a new password.
              </p>
            </div>

            <button
              type="button"
              onClick={handleChangePassword}
              disabled={busy === "password"}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-60 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              {busy === "password" ? "Sending..." : "Change Password"}
            </button>

          </div>
          )}


          {/* Logout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-200 rounded-lg dark:border-slate-700">

            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Sign Out
              </h3>

              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                Sign out of your Tied account.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              Sign Out
            </button>

          </div>

        </div>

        <Message status={accountStatus} />

      </div>


      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 mt-6 dark:bg-slate-900 dark:border-red-900">

        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
          Danger Zone
        </h2>

        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          These actions can permanently affect your account.
        </p>


        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Delete Account
            </h3>

            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              Permanently delete your Tied account and all associated data.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={busy === "delete"}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-60"
          >
            {busy === "delete" ? "Deleting..." : "Delete Account"}
          </button>

        </div>

        <Message status={deleteStatus} />

      </div>

    </div>
  );
};

export default Settings;