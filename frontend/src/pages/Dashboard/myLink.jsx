import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../../services/api.js";
import LinkIcon from "../../components/LinkIcon.jsx";

const emptyForm = { title: "", url: "", icon: "" };

// Shared by "Add Link" and the edit action
const LinkForm = ({ initial = emptyForm, submitLabel, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit({ ...form, title: form.title.trim(), url: form.url.trim(), icon: form.icon.trim() });
    setSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-4">
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
            Icon
          </label>
          <div className="flex items-center gap-2 mt-2">
            {/* Live preview: the site's icon until an emoji is typed */}
            <div className="w-12 h-12 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-2xl">
              <LinkIcon url={form.url} icon={form.icon.trim()} />
            </div>
            <input
              id="icon"
              name="icon"
              type="text"
              maxLength={4}
              value={form.icon}
              onChange={handleChange}
              placeholder="Auto"
              title="Leave empty to use the website's icon, or type an emoji"
              className="w-full min-w-0 p-3 border border-gray-200 rounded-lg text-center"
            />
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={100}
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. GitHub"
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          URL
        </label>
        <input
          id="url"
          name="url"
          type="text"
          required
          value={form.url}
          onChange={handleChange}
          placeholder="github.com/username"
          className="w-full mt-2 p-3 border border-gray-200 rounded-lg"
        />
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

const MyLink = () => {
  const [links, setLinks] = useState(null);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    api
      .get("/links")
      .then((res) => setLinks(res.data))
      .catch((err) => setError(getApiErrorMessage(err)));
  }, []);

  // Runs an API call, showing its error message if it fails. Returns true on success.
  const run = async (request) => {
    setError("");

    try {
      await request();
      return true;
    } catch (err) {
      setError(getApiErrorMessage(err));
      return false;
    }
  };

  const handleAdd = (form) =>
    run(async () => {
      const { data } = await api.post("/links", form);
      setLinks((current) => [...current, data]);
      setAdding(false);
    });

  const handleUpdate = (id, changes) =>
    run(async () => {
      const { data } = await api.patch(`/links/${id}`, changes);
      setLinks((current) => current.map((link) => (link._id === id ? data : link)));
      setEditingId(null);
    });

  const handleDelete = (link) => {
    if (!window.confirm(`Delete "${link.title}"? Its click history will be removed too.`)) return;

    run(async () => {
      await api.delete(`/links/${link._id}`);
      setLinks((current) => current.filter((l) => l._id !== link._id));
    });
  };

  // Moves the dragged link live as it passes over others
  const handleDragEnter = (index) => {
    if (dragIndex === null || index === dragIndex) return;

    setLinks((current) => {
      const next = [...current];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(index);
  };

  const handleDragEnd = async () => {
    setDragIndex(null);

    const saved = await run(async () => {
      const { data } = await api.put("/links/reorder", { ids: links.map((l) => l._id) });
      setLinks(data);
    });

    // Put the list back the way the server has it
    if (!saved) {
      const { data } = await api.get("/links");
      setLinks(data);
    }
  };

  return (
    <div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            My Links
          </h1>

          <p className="mt-2 text-gray-600">
            Manage the links displayed on your Tied profile.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setAdding(true);
            setEditingId(null);
          }}
          className="bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-700 transition"
        >
          + Add Link
        </button>

      </div>


      {error && (
        <p className="mt-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}


      {/* New Link */}
      {adding && (
        <div className="mt-8">
          <LinkForm
            submitLabel="Add Link"
            onSubmit={handleAdd}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}


      {/* Links List */}
      <div className="mt-8 space-y-4">

        {!links && !error && (
          <p className="text-gray-500">Loading links...</p>
        )}

        {links?.length === 0 && !adding && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            You haven't added any links yet. Click <span className="font-medium">+ Add Link</span> to get started.
          </div>
        )}

        {links?.map((link, index) =>
          editingId === link._id ? (
            <LinkForm
              key={link._id}
              initial={{ title: link.title, url: link.url, icon: link.icon }}
              submitLabel="Save"
              onSubmit={(form) => handleUpdate(link._id, form)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={link._id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={handleDragEnd}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition ${
                dragIndex === index ? "opacity-50" : ""
              }`}
            >

              {/* Left Side */}
              <div className="flex items-center gap-4 min-w-0">

                {/* Drag Handle */}
                <div className="text-gray-400 cursor-grab text-xl" title="Drag to reorder">
                  ⋮⋮
                </div>

                {/* Icon */}
                <div className="w-12 h-12 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-2xl">
                  <LinkIcon url={link.url} icon={link.icon} />
                </div>

                {/* Link Information */}
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {link.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {link.url.replace(/^https?:\/\//, "")}
                  </p>
                </div>

              </div>


              {/* Right Side */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 pl-9 sm:pl-0">

                {/* Clicks */}
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    CLICKS
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {link.clicks.toLocaleString()}
                  </p>
                </div>


                {/* Visibility */}
                <button
                  type="button"
                  onClick={() => handleUpdate(link._id, { active: !link.active })}
                  title={link.active ? "Hide from profile" : "Show on profile"}
                  className={`flex items-center gap-2 text-sm rounded-lg px-2 py-1 hover:bg-gray-100 ${
                    link.active
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <span className="text-base">
                    {link.active ? "●" : "○"}
                  </span>

                  {link.active ? "Visible" : "Hidden"}
                </button>


                {/* More Options */}
                <div className="relative">
                  <button
                    type="button"
                    aria-label="More options"
                    onClick={() => setMenuId(menuId === link._id ? null : link._id)}
                    className="text-xl text-gray-400 hover:text-gray-900 px-2"
                  >
                    ⋮
                  </button>

                  {menuId === link._id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenuId(null)}></div>

                      <div className="absolute right-0 mt-2 z-20 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 text-sm">
                        <button
                          type="button"
                          onClick={() => {
                            setMenuId(null);
                            setAdding(false);
                            setEditingId(link._id);
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuId(null)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Open link
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setMenuId(null);
                            handleDelete(link);
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default MyLink;
