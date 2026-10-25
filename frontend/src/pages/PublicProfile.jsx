import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api.js";
import ProfileView from "../components/ProfileView.jsx";

// The page visitors see at /<username>
const PublicProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const viewRecorded = useRef(false);

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
          api.post(`/public/${username}/view`, { referrer: document.referrer }).catch(() => {});
        }
      })
      .catch(() => setNotFound(true));
  }, [username, navigate]);

  // Record the click; the browser opens the link as usual
  const handleLinkClick = (e, link) => {
    api.post(`/public/links/${link._id}/click`, { referrer: document.referrer }).catch(() => {});
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
