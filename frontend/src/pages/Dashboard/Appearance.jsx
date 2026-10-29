import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api, { getApiErrorMessage } from "../../services/api.js";
import ProfileView from "../../components/ProfileView.jsx";
import ImageCropper from "../../components/ImageCropper.jsx";
import resizeImage from "../../utils/resizeImage.js";

const THEME_OPTIONS = [
  { value: "light", label: "Light", className: "bg-white text-gray-900" },
  { value: "dark", label: "Dark", className: "bg-gray-900 text-white" },
  { value: "custom", label: "Custom", className: "bg-white text-gray-900" },
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

// Matches the defaults in the backend User model
const DEFAULT_THEME = {
  theme: "light",
  backgroundColor: "#ffffff",
  buttonColor: "#0f172a",
  textColor: "#ffffff",
};

const optionClass = (selected) =>
  selected
    ? "border-2 border-slate-800 dark:border-teal-400"
    : "border border-gray-300 hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-800";

const Appearance = () => {
  const { profile, setProfile } = useAuth();

  const [form, setForm] = useState({
    displayName: profile.displayName || "",
    bio: profile.bio || "",
    appearance: { ...profile.appearance },
  });
  const [links, setLinks] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [saving, setSaving] = useState(false);
  const [imageStatus, setImageStatus] = useState({ type: "", message: "" });
  const [imageBusy, setImageBusy] = useState(false);
  const [cropFile, setCropFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    api.get("/links").then((res) => setLinks(res.data.filter((link) => link.active)));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setAppearance = (key, value) => {
    setForm({ ...form, appearance: { ...form.appearance, [key]: value } });
  };

  // Like the other options, this only takes effect after "Save Changes"
  const resetTheme = () => {
    setForm({ ...form, appearance: { ...form.appearance, ...DEFAULT_THEME } });
  };

  const isDefaultTheme = Object.entries(DEFAULT_THEME).every(
    ([key, value]) => form.appearance[key] === value
  );

  // Opens the cropper; the upload happens once the user applies the crop
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageStatus({ type: "error", message: "Please choose an image file." });
      return;
    }

    setImageStatus({ type: "", message: "" });
    setCropFile(file);
  };

  const handleCropError = () => {
    setCropFile(null);
    setImageStatus({ type: "error", message: "We couldn't read that image. Try a JPEG or PNG." });
  };

  // The picture saves right away, separately from "Save Changes"
  const handleCropConfirm = async (crop) => {
    const file = cropFile;
    setCropFile(null);
    setImageBusy(true);

    try {
      const image = await resizeImage(file, 400, crop);
      const { data } = await api.put("/users/me/avatar", image, {
        headers: { "Content-Type": "image/jpeg" },
      });
      setProfile(data);
      setImageStatus({ type: "success", message: "Profile picture updated." });
    } catch (err) {
      setImageStatus({
        type: "error",
        message: err.isAxiosError ? getApiErrorMessage(err) : "We couldn't read that image. Try a JPEG or PNG.",
      });
    } finally {
      setImageBusy(false);
    }
  };

  const handleImageRemove = async () => {
    setImageBusy(true);
    setImageStatus({ type: "", message: "" });

    try {
      const { data } = await api.delete("/users/me/avatar");
      setProfile(data);
    } catch (err) {
      setImageStatus({ type: "error", message: getApiErrorMessage(err) });
    } finally {
      setImageBusy(false);
    }
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
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Appearance
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Customize how your Tied profile looks to visitors.
        </p>
      </div>


      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


        {/* Customization Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 dark:bg-slate-900 dark:border-slate-700">

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Customize Profile
          </h2>

          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Personalize your profile appearance.
          </p>


          {/* Profile Image */}
          <div className="mt-8">

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Image
            </label>

            <div className="flex items-center gap-5 mt-3">

              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className={`w-20 h-20 shrink-0 rounded-full object-cover ${imageBusy ? "opacity-50" : ""}`} />
              ) : (
                <div className="w-20 h-20 shrink-0 rounded-full bg-slate-200 flex items-center justify-center text-2xl dark:bg-slate-700">
                  👤
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  disabled={imageBusy}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-60 dark:border-slate-600 dark:hover:bg-slate-800"
                >
                  {imageBusy ? "Uploading..." : profile.avatarUrl ? "Change Image" : "Upload Image"}
                </button>

                {profile.avatarUrl && !imageBusy && (
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    Remove
                  </button>
                )}
              </div>

            </div>

            {cropFile && (
              <ImageCropper
                file={cropFile}
                onCancel={() => setCropFile(null)}
                onConfirm={handleCropConfirm}
                onError={handleCropError}
              />
            )}

            {imageStatus.message && (
              <p className={`mt-3 text-sm ${imageStatus.type === "error" ? "text-red-600" : "text-green-600"}`}>
                {imageStatus.message}
              </p>
            )}

          </div>


          {/* Name */}
          <div className="mt-6">

            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              maxLength={50}
              value={form.displayName}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg dark:border-slate-700"
            />

          </div>


          {/* Bio */}
          <div className="mt-6">

            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg resize-none dark:border-slate-700"
            />

            <p className="text-xs text-gray-400 text-right dark:text-gray-500">
              {form.bio.length}/160
            </p>

          </div>


          {/* Theme */}
          <div className="mt-6">

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                <label key={field.key} className="text-sm text-gray-700 dark:text-gray-300">
                  {field.label}

                  <input
                    type="color"
                    value={form.appearance[field.key]}
                    onChange={(e) => setAppearance(field.key, e.target.value)}
                    className="block w-full h-10 mt-2 border border-gray-200 rounded-lg cursor-pointer dark:border-slate-700"
                  />
                </label>
              ))}
            </div>
          )}

          {!isDefaultTheme && (
            <button
              type="button"
              onClick={resetTheme}
              className="mt-4 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              Reset to Default Theme
            </button>
          )}


          {/* Button Style */}
          <div className="mt-6">

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
            className="mt-8 w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700 disabled:opacity-60 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>


        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 dark:bg-slate-900 dark:border-slate-700">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Profile Preview
              </h2>

              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                Preview how your profile will appear.
              </p>
            </div>

            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal-700 hover:underline dark:text-teal-400"
            >
              View live profile ↗
            </a>

          </div>


          {/* Phone Preview */}
          <div className="flex justify-center mt-8">

            <div className="w-full max-w-75 min-h-130 bg-slate-900 rounded-[2rem] p-3 shadow-xl dark:bg-black dark:ring-1 dark:ring-slate-700">

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
