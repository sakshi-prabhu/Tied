const THEMES = {
  light: { backgroundColor: "#ffffff", buttonColor: "#0f172a", textColor: "#ffffff", pageText: "#111827" },
  dark: { backgroundColor: "#111827", buttonColor: "#ffffff", textColor: "#111827", pageText: "#ffffff" },
};

const BUTTON_SHAPES = {
  rounded: "rounded-full",
  soft: "rounded-lg",
  square: "rounded-none",
};

// The visitor-facing profile, used by the public page and the Appearance preview
const ProfileView = ({ profile, links, onLinkClick }) => {
  const { appearance } = profile;

  const colors =
    THEMES[appearance.theme] || {
      backgroundColor: appearance.backgroundColor,
      buttonColor: appearance.buttonColor,
      textColor: appearance.textColor,
      pageText: appearance.buttonColor,
    };

  return (
    <div
      className="min-h-full flex-1 p-6 flex flex-col"
      style={{ backgroundColor: colors.backgroundColor, color: colors.pageText }}
    >
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">

      {/* Profile */}
      <div className="text-center">

        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt=""
            className="w-20 h-20 mx-auto rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-3xl">
            👤
          </div>
        )}

        <h3 className="text-xl font-bold mt-4">
          {profile.displayName || profile.username}
        </h3>

        {profile.bio && (
          <p className="text-sm opacity-70 mt-2">
            {profile.bio}
          </p>
        )}

      </div>


      {/* Links */}
      <div className="mt-8 space-y-3">

        {links.length === 0 && (
          <p className="text-center text-sm opacity-60">
            No links yet
          </p>
        )}

        {links.map((link) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick ? (e) => onLinkClick(e, link) : (e) => e.preventDefault()}
            className={`block text-center py-3 px-4 font-medium hover:opacity-90 transition ${BUTTON_SHAPES[appearance.buttonStyle]}`}
            style={{ backgroundColor: colors.buttonColor, color: colors.textColor }}
          >
            {link.icon && <span className="mr-2">{link.icon}</span>}
            {link.title}
          </a>
        ))}

      </div>


      {/* Tied Branding */}
      <div className="text-center mt-auto pt-8 text-xs opacity-50">
        Powered by Tied
      </div>

      </div>
    </div>
  );
};

export default ProfileView;
