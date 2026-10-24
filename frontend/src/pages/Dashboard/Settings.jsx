import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig.js";

const Settings = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Settings
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your Tied account and profile settings.
        </p>
      </div>


      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">

        <h2 className="text-xl font-semibold text-gray-900">
          Profile Settings
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage the information associated with your profile.
        </p>


        {/* Username */}
        <div className="mt-6">

          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>

          <div className="flex mt-2">

            <span className="bg-gray-100 border border-gray-200 border-r-0 rounded-l-lg px-3 sm:px-4 py-3 text-gray-500">
              tied.app/
            </span>

            <input
              type="text"
              value="sakshi"
              readOnly
              className="flex-1 min-w-0 p-3 border border-gray-200 rounded-r-lg bg-gray-50"
            />

          </div>

        </div>


        {/* Email */}
        <div className="mt-6">

          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            value="sakshi@example.com"
            readOnly
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50"
          />

        </div>


        {/* Save */}
        <button className="mt-6 bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-700">
          Save Changes
        </button>

      </div>


      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

        <h2 className="text-xl font-semibold text-gray-900">
          Account
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage your account security.
        </p>


        <div className="mt-6 space-y-4">

          {/* Change Password */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-200 rounded-lg">

            <div>
              <h3 className="font-medium text-gray-900">
                Password
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Update your account password.
              </p>
            </div>

            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              Change Password
            </button>

          </div>


          {/* Logout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-200 rounded-lg">

            <div>
              <h3 className="font-medium text-gray-900">
                Sign Out
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Sign out of your Tied account.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Sign Out
            </button>

          </div>

        </div>

      </div>


      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 mt-6">

        <h2 className="text-xl font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          These actions can permanently affect your account.
        </p>


        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <div>
            <h3 className="font-medium text-gray-900">
              Delete Account
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Permanently delete your Tied account and all associated data.
            </p>
          </div>

          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete Account
          </button>

        </div>

      </div>

    </div>
  );
};

export default Settings;