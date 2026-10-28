import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../services/api.js";
import ProfileView from "../components/ProfileView.jsx";

// A random ID kept in this browser so analytics counts the same visitor once a day,
// even when their IP changes (common on mobile data). Not tied to any personal data.
const getVisitorId = () => {
  try {
    let id = localStorage.getItem("tied_visitor");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("tied_visitor", id);
    }
    return id;
  } catch {
    return undefined;
  }
};

// The page visitors see at /<username>
const PublicProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const viewRecorded = useRef(false);

  // ?ref=whatsapp (added by the dashboard's share buttons) tells analytics where the
  // visitor came from. Read once, since the address bar is cleaned up below.
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef(searchParams.get("ref") || searchParams.get("utm_source") || "");
  const visitorId = useRef(getVisitorId());

  useEffect(() => {
    api
      .get(`/public/${username}`)
      .then((res) => {
        // An old username: move to the current link (this effect then runs again)
        if (res.data.username !== username.toLowerCase()) {
          navigate(`/${res.data.username}`, { replace: true });
          return;
        }

        setProfile(res.data);

        // Count each page load once (StrictMode runs effects twice in dev)
        if (!viewRecorded.current) {
          viewRecorded.current = true;
          api
            .post(`/public/${username}/view`, { referrer: document.referrer, ref: ref.current, visitorId: visitorId.current })
            .catch(() => {});

          // So a visitor who copies the link from the address bar doesn't pass the tag on
          if (searchParams.has("ref")) {
            const cleaned = new URLSearchParams(searchParams);
            cleaned.delete("ref");
            setSearchParams(cleaned, { replace: true });
          }
        }
      })
      .catch(() => setNotFound(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only refetch when the profile changes
  }, [username, navigate]);

  // Record the click; the browser opens the link as usual
  const handleLinkClick = (e, link) => {
    api
      .post(`/public/links/${link._id}/click`, {
        referrer: document.referrer,
        ref: ref.current,
        visitorId: visitorId.current,
      })
      .catch(() => {});
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          This profile doesn't exist
        </h1>

        <Link to="/" className="text-teal-700 hover:underline dark:text-teal-400">
          Create your own Tied profile
        </Link>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ProfileView profile={profile} links={profile.links} onLinkClick={handleLinkClick} />
    </div>
  );
};

export default PublicProfile;
