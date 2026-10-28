import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseConfig.js";
import { getAuthErrorMessage, isPopupClosed } from "../../firebase/authErrors.js";
import { useAuth } from "../../context/AuthContext.jsx";
import api, { getApiErrorMessage } from "../../services/api.js";
import { profileUrl, profileUrlPrefix, USERNAME_PATTERN } from "../../utils/profileUrl.js";
import HelpSection from "../../Dashboard/HelpSection.jsx";
import {
  HiOutlineExclamation,
  HiOutlineQuestionMarkCircle,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from "react-icons/hi";

const AVAILABILITY_MESSAGES = {
  checking: { className: "text-gray-500 dark:text-gray-400", text: "Checking..." },
  available: { className: "text-green-700 dark:text-green-400", text: "Available" },
  taken: { className: "text-red-600 dark:text-red-400", text: "Already taken" },
  reserved: { className: "text-red-600 dark:text-red-400", text: "This name is reserved" },
  invalid: { className: "text-red-600 dark:text-red-400", text: "3–30 characters: letters, numbers, _ or ." },
};

const Message = ({ status }) =>
  status.message ? (
    <p
      className={`mt-4 text-sm rounded-lg px-4 py-3 border ${
        status.type === "error"
          ? "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950/40 dark:border-red-900"
          : "text-green-700 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-950/40 dark:border-green-900"
      }`}
    >
      {status.message}
    </p>
  ) : null;

// Card with an icon header, used for every settings group
const Section = ({ icon: Icon, title, description, danger, children }) => (
  <section
    className={`bg-white rounded-xl shadow-sm border mt-6 dark:bg-slate-900 ${
      danger ? "border-red-200 dark:border-red-900" : "border-gray-200 dark:border-slate-700"
    }`}
  >
    <div
      className={`flex items-start gap-4 px-6 py-5 border-b ${
        danger ? "border-red-100 dark:border-red-900/60" : "border-gray-100 dark:border-slate-800"
      }`}
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
          danger
            ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-gray-300"
        }`}
      >
        <Icon />
      </div>

      <div>
        <h2 className={`text-lg font-semibold ${danger ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-gray-100"}`}>
          {title}
        </h2>

        <p className="text-sm text-gray-500 mt-0.5 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>

    <div className="px-6 py-5">
      {children}
    </div>
  </section>
);

// Label + help text on the left, action on the right
const SettingRow = ({ title, description, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
    <div>
      <h3 className="font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
        {description}
      </p>
    </div>

    {children}
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const { user, profile, setProfile } = useAuth();

  const [username, setUsername] = useState(profile.username);
  const [profileStatus, setProfileStatus] = useState({ type: "", message: "" });
  const [accountStatus, setAccountStatus] = useState({ type: "", message: "" });
  const [deleteStatus, setDeleteStatus] = useState({ type: "", message: "" });
  const [busy, setBusy] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  // Server answer for the last username we checked: { username, result }
  const [checked, setChecked] = useState({ username: "", result: "" });

  const cleanUsername = username.trim().toLowerCase();
  const usernameChanged = cleanUsername !== profile.username;
  const usernameValid = USERNAME_PATTERN.test(cleanUsername);
  // Switching back to one of your own old usernames is always allowed
  const ownOldUsername = profile.previousUsernames?.includes(cleanUsername);

  let availability = "";
  if (usernameChanged) {
    if (!usernameValid) availability = "invalid";
    else if (ownOldUsername) availability = "available";
    else if (checked.username === cleanUsername) availability = checked.result;
    else availability = "checking";
  }

  // Check the new link as the user types, once they pause
  useEffect(() => {
    if (!usernameChanged || !usernameValid || ownOldUsername) return;

    let cancelled = false;

    const timer = setTimeout(async () => {
      let result = "";
      try {
        const { data } = await api.get(`/users/check-username/${cleanUsername}`);
        result = data.available ? "available" : data.reason || "taken";
      } catch {
        // Leave it unknown; saving still reports any problem
      }
      if (!cancelled) setChecked({ username: cleanUsername, result });
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [cleanUsername, usernameChanged, usernameValid, ownOldUsername]);

  // Google accounts have no Tied password to change
  const hasPassword = user.providerData.some((p) => p.providerId === "password");

  const handleSaveProfile = async () => {
    const value = cleanUsername;
    setProfileStatus({ type: "", message: "" });

    if (!USERNAME_PATTERN.test(value)) {
      setProfileStatus({ type: "error", message: "Username must be 3–30 characters: letters, numbers, _ or ." });
      return;
    }

    setBusy("profile");

    try {
      const { data } = await api.patch("/users/me", { username: value });
      setProfile(data);
      setUsername(data.username);
      setProfileStatus({ type: "success", message: `Your link is now ${profileUrl(data.username)}. Links you already shared will still lead here.` });
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

  // Firebase only lets an account be deleted shortly after signing in, so the user
  // confirms who they are first (password, or the Google popup)
  const reauthenticate = () =>
    hasPassword
      ? reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, deletePassword))
      : reauthenticateWithPopup(user, googleProvider);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    setBusy("delete");
    setDeleteStatus({ type: "", message: "" });

    try {
      await reauthenticate();
    } catch (err) {
      if (!isPopupClosed(err)) {
        setDeleteStatus({
          type: "error",
          message: hasPassword && err.code === "auth/invalid-credential" ? "Incorrect password." : getAuthErrorMessage(err),
        });
      }
      setBusy("");
      return;
    }

    // Data first: if this fails nothing is lost and the user can simply try again.
    // (Deleting the login first would sign them out and leave the public profile online.)
    try {
      await api.delete("/users/me");
    } catch (err) {
      setDeleteStatus({ type: "error", message: getApiErrorMessage(err) });
      setBusy("");
      return;
    }

    try {
      await deleteUser(user);
    } catch {
      // The profile is already gone; just make sure they end up signed out
      await signOut(auth).catch(() => {});
    }

    navigate("/", { replace: true });
  };

  const secondaryButton =
    "shrink-0 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-800";

  const dangerButton =
    "shrink-0 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Settings
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your profile, account security, and find help using Tied.
        </p>
      </div>


      {/* Profile */}
      <Section
        icon={HiOutlineUser}
        title="Profile"
        description="Your public link and the email on your account."
      >

        {/* Username */}
        <div>

          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Profile Link
          </label>

          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Your username is your public link. Pick something easy to remember.
          </p>

          <div className="flex mt-2 rounded-lg focus-within:ring-2 focus-within:ring-teal-600">

            <span className="bg-gray-100 border border-gray-300 border-r-0 rounded-l-lg px-3 sm:px-4 py-2.5 text-sm text-gray-500 flex items-center dark:bg-slate-800 dark:border-slate-600 dark:text-gray-400">
              {profileUrlPrefix()}
            </span>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
              maxLength={30}
              autoCapitalize="none"
              spellCheck={false}
              className="flex-1 min-w-0 px-3 py-2.5 border border-gray-300 rounded-r-lg outline-none dark:border-slate-600 dark:bg-slate-950"
            />

          </div>

          {AVAILABILITY_MESSAGES[availability] && (
            <p className={`mt-2 text-sm ${AVAILABILITY_MESSAGES[availability].className}`}>
              {AVAILABILITY_MESSAGES[availability].text}
            </p>
          )}

        </div>


        {/* Email */}
        <div className="mt-6">

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className="w-full mt-2 px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed outline-none dark:border-slate-600 dark:bg-slate-950 dark:text-gray-400"
          />

          <p className="text-xs text-gray-400 mt-1.5 dark:text-gray-500">
            Signed in with {hasPassword ? "email and password" : "Google"}. Your email can't be changed here.
          </p>

        </div>


        <Message status={profileStatus} />

        {/* Save */}
        <div className="flex justify-end mt-6 pt-5 border-t border-gray-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={busy === "profile" || !usernameChanged || ["checking", "invalid", "taken", "reserved"].includes(availability)}
            className="bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {busy === "profile" ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </Section>


      {/* Account */}
      <Section
        icon={HiOutlineShieldCheck}
        title="Account & Security"
        description="Manage how you sign in to Tied."
      >

        <div className="divide-y divide-gray-100 dark:divide-slate-800">

          {hasPassword && (
            <SettingRow title="Password" description="We'll email you a link to set a new password.">
              <button
                type="button"
                onClick={handleChangePassword}
                disabled={busy === "password"}
                className={secondaryButton}
              >
                {busy === "password" ? "Sending..." : "Change Password"}
              </button>
            </SettingRow>
          )}

          <SettingRow title="Sign Out" description="Sign out of your Tied account on this device.">
            <button type="button" onClick={handleSignOut} className={secondaryButton}>
              Sign Out
            </button>
          </SettingRow>

        </div>

        <Message status={accountStatus} />

      </Section>


      {/* Help */}
      <Section
        icon={HiOutlineQuestionMarkCircle}
        title="Help & Support"
        description="New to Tied? Follow these steps to set up your profile, or find a quick answer below."
      >
        <HelpSection />
      </Section>


      {/* Danger Zone */}
      <Section
        icon={HiOutlineExclamation}
        title="Danger Zone"
        description="These actions are permanent and can't be undone."
        danger
      >

        <SettingRow
          title="Delete Account"
          description="Permanently delete your Tied account, profile, links and analytics."
        >
          {!confirmingDelete && (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className={dangerButton}
            >
              Delete Account
            </button>
          )}
        </SettingRow>

        {confirmingDelete && (
          <form
            onSubmit={handleDeleteAccount}
            className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30"
          >
            <p className="text-sm text-red-700 dark:text-red-300">
              Your profile at <span className="font-medium">{profileUrl(profile.username)}</span>, all your
              links and analytics will be permanently deleted. This can't be undone.
            </p>

            {hasPassword && (
              <label className="block mt-4">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Enter your password to confirm
                </span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  required
                  autoFocus
                  className="mt-2 w-full sm:max-w-xs px-3 py-2 rounded-lg border border-gray-300 bg-white outline-none focus:border-red-500 dark:bg-slate-950 dark:border-slate-700 dark:text-gray-100"
                />
              </label>
            )}

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                type="submit"
                disabled={busy === "delete" || (hasPassword && !deletePassword)}
                className={dangerButton}
              >
                {busy === "delete"
                  ? "Deleting..."
                  : hasPassword ? "Permanently Delete" : "Confirm with Google & Delete"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setConfirmingDelete(false);
                  setDeletePassword("");
                  setDeleteStatus({ type: "", message: "" });
                }}
                disabled={busy === "delete"}
                className={secondaryButton}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <Message status={deleteStatus} />

      </Section>

    </div>
  );
};

export default Settings;