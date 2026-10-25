import { useState } from "react";

// "github.com/me" or "https://www.github.com/me" -> "github.com"
const getDomain = (url) => {
  try {
    const withProtocol = /^[a-z][a-z0-9+.-]*:/i.test(url) ? url : `https://${url}`;
    return new URL(withProtocol).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

// Shows the emoji the user picked, otherwise the website's own icon
const LinkIcon = ({ url, icon, className = "w-6 h-6" }) => {
  const domain = getDomain(url);
  const [failedDomain, setFailedDomain] = useState("");

  if (icon) {
    return <span>{icon}</span>;
  }

  if (!domain.includes(".") || failedDomain === domain) {
    return <span>🔗</span>;
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`}
      alt=""
      loading="lazy"
      onError={() => setFailedDomain(domain)}
      className={`${className} object-contain`}
    />
  );
};

export default LinkIcon;
