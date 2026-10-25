import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { useAuth } from "../context/AuthContext.jsx";
import { profileUrl, profileUrlLabel } from "../utils/profileUrl.js";

// The user's public link with ways to copy it or share it anywhere
const ProfileCard = () => {
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);

  const url = profileUrl(profile.username);
  const name = profile.displayName || profile.username;
  const text = `Check out ${name} on Tied`;

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const shareTargets = [
    { label: "WhatsApp", icon: FaWhatsapp, href: `https://wa.me/?text=${encodedText}%20${encodedUrl}` },
    { label: "X", icon: FaXTwitter, href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}` },
    { label: "LinkedIn", icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "Facebook", icon: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "Email", icon: HiOutlineMail, href: `mailto:?subject=${encodedText}&body=${encodedUrl}` },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your profile link:", url);
    }
  };

  // Phones get the system share sheet (Instagram, Messages, ...)
  const canNativeShare = typeof navigator.share === "function";

  const handleNativeShare = () => {
    navigator.share({ title: `${name} | Tied`, text, url }).catch(() => {});
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-8 dark:bg-slate-900 dark:border-slate-700">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">
            Your Tied Link
          </h2>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Share it in your bio, posts or messages.
          </p>
        </div>

        <Link
          to="/dashboard/settings"
          className="text-sm text-teal-700 hover:underline dark:text-teal-400"
        >
          Customize link
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 truncate px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 font-medium text-gray-900 hover:border-teal-500 dark:bg-slate-950 dark:border-slate-700 dark:text-gray-100"
        >
          {profileUrlLabel(profile.username)}
        </a>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 sm:flex-none px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-700 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="flex-1 sm:flex-none px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              Share
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {shareTargets.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            title={`Share on ${label}`}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
