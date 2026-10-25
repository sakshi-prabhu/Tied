import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api, { getApiErrorMessage } from "../../services/api.js";
import ProfileView from "../../components/ProfileView.jsx";

const THEME_OPTIONS = [
  { value: "light", label: "Light", className: "bg-white" },
  { value: "dark", label: "Dark", className: "bg-gray-900 text-white" },
  { value: "custom", label: "Custom", className: "bg-white" },
];

const BUTTON_OPTIONS = [
  { value: "rounded", label: "Rounded", className: "rounded-full" },
  { value: "soft", label: "Soft", className: "rounded-lg" },
  { value: "square", label: "Square", className: "" },
];

const COLOR_FIELDS = [
  { key: "backgroundColor", label: "Background" },
  { key: "buttonColor", label: "Button" },
  { key: "textColor", label: "Button Text" },
];

const optionClass = (selected) =>
  selected ? "border-2 border-slate-800" : "border border-gray-300 hover:bg-gray-100";

const Appearance = () => {
  const { profile, setProfile } = useAuth();

  const [form, setForm] = useState({
    displayName: profile.displayName || "",
    bio: profile.bio || "",
    avatarUrl: profile.avatarUrl || "",
    appearance: { ...profile.appearance },
  });
  const [links, setLinks] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/links").then((res) => setLinks(res.data.filter((link) => link.active)));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setAppearance = (key, value) => {
    setForm({ ...form, appearance: { ...form.appearance, [key]: value } });
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus({ type: "", message: "" });

    try {
      const { data } = await api.patch("/users/me", form);
      setProfile(data);
      setStatus({ type: "success", message: "Changes saved." });
    } catch (err) {
      setStatus({ type: "error", message: getApiErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Appearance
        </h1>

        <p className="mt-2 text-gray-600">
          Customize how your Tied profile looks to visitors.
        </p>
      </div>


      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


        {/* Customization Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Customize Profile
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Personalize your profile appearance.
          </p>


          {/* Profile Image */}
          <div className="mt-8">

            <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>

            <div className="flex items-center gap-5 mt-3">

              {form.avatarUrl ? (
                <img src={form.avatarUrl} alt="" className="w-20 h-20 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 shrink-0 rounded-full bg-slate-200 flex items-center justify-center text-2xl">
                  👤
                </div>
              )}

              <input
                id="avatarUrl"
                name="avatarUrl"
                type="url"
                value={form.avatarUrl}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full min-w-0 p-3 border border-gray-200 rounded-lg"
              />

            </div>

          </div>


          {/* Name */}
          <div className="mt-6">

            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              maxLength={50}
              value={form.displayName}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg"
            />

          </div>


          {/* Bio */}
          <div className="mt-6">

            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              rows="3"
              maxLength={160}
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell visitors about yourself"
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg resize-none"
            />

            <p className="text-xs text-gray-400 text-right">
              {form.bio.length}/160
            </p>

          </div>


          {/* Theme */}
          <div className="mt-6">

            <label className="block text-sm font-medium text-gray-700">
              Theme
            </label>

            <div className="flex flex-wrap gap-3 mt-3">
              {THEME_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAppearance("theme", option.value)}
                  className={`px-4 py-2 rounded-lg ${option.className} ${optionClass(form.appearance.theme === option.value)}`}
                >
                  {option.label}
                </button>
              ))}
            </div>

          </div>


          {/* Custom Colors */}
          {form.appearance.theme === "custom" && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {COLOR_FIELDS.map((field) => (
                <label key={field.key} className="text-sm text-gray-700">
                  {field.label}

                  <input
                    type="color"
                    value={form.appearance[field.key]}
                    onChange={(e) => setAppearance(field.key, e.target.value)}
                    className="block w-full h-10 mt-2 border border-gray-200 rounded-lg cursor-pointer"
                  />
                </label>
              ))}
            </div>
          )}


          {/* Button Style */}
          <div className="mt-6">

            <label className="block text-sm font-medium text-gray-700">
              Button Style
            </label>

            <div className="flex flex-wrap gap-3 mt-3">
              {BUTTON_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAppearance("buttonStyle", option.value)}
                  className={`px-5 py-2 ${option.className} ${optionClass(form.appearance.buttonStyle === option.value)}`}
                >
                  {option.label}
                </button>
              ))}
            </div>

          </div>


          {status.message && (
            <p
              className={`mt-6 text-sm rounded-lg px-4 py-3 border ${
                status.type === "error"
                  ? "text-red-700 bg-red-50 border-red-200"
                  : "text-green-700 bg-green-50 border-green-200"
              }`}
            >
              {status.message}
            </p>
          )}


          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="mt-8 w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>


        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Preview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Preview how your profile will appear.
              </p>
            </div>

            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal-700 hover:underline"
            >
              View live profile ↗
            </a>

          </div>


          {/* Phone Preview */}
          <div className="flex justify-center mt-8">

            <div className="w-full max-w-75 min-h-130 bg-slate-900 rounded-[2rem] p-3 shadow-xl">

              <div className="rounded-[1.5rem] h-[494px] overflow-y-auto flex flex-col">
                <ProfileView
                  profile={{ ...profile, ...form }}
                  links={links}
                />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Appearance;
