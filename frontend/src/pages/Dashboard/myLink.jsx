const MyLink = () => {
  const links = [
    {
      id: 1,
      title: "GitHub",
      url: "github.com/username",
      clicks: 842,
      active: true,
      icon: "🐙",
    },
    {
      id: 2,
      title: "LinkedIn",
      url: "linkedin.com/in/username",
      clicks: 621,
      active: true,
      icon: "💼",
    },
    {
      id: 3,
      title: "Portfolio",
      url: "myportfolio.com",
      clicks: 493,
      active: true,
      icon: "🌐",
    },
    {
      id: 4,
      title: "Resume",
      url: "example.com/resume",
      clicks: 317,
      active: false,
      icon: "📄",
    },
  ];

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

        <button className="bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-700 transition">
          + Add Link
        </button>

      </div>


      {/* Links List */}
      <div className="mt-8 space-y-4">

        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition"
          >

            {/* Left Side */}
            <div className="flex items-center gap-4 min-w-0">

              {/* Drag Handle */}
              <div className="text-gray-400 cursor-grab text-xl">
                ⋮⋮
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-2xl">
                {link.icon}
              </div>

              {/* Link Information */}
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-gray-900">
                  {link.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1 truncate">
                  {link.url}
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
                  {link.clicks}
                </p>
              </div>


              {/* Visibility */}
              <div
                className={`flex items-center gap-2 text-sm ${
                  link.active
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <span className="text-base">
                  {link.active ? "●" : "○"}
                </span>

                {link.active ? "Visible" : "Hidden"}
              </div>


              {/* More Options */}
              <button className="text-xl text-gray-400 hover:text-gray-900 px-2">
                ⋮
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default MyLink;