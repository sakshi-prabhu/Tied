import { useEffect, useRef } from "react";

const INTERVAL_MS = 15 * 1000;

// Calls `refresh` every 15s while the tab is visible, and right away when the
// user comes back to the tab, so dashboard numbers stay current without a reload
const useAutoRefresh = (refresh) => {
  const refreshRef = useRef(refresh);

  useEffect(() => {
    refreshRef.current = refresh;
  });

  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === "visible") refreshRef.current();
    };

    const timer = setInterval(tick, INTERVAL_MS);
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, []);
};

export default useAutoRefresh;
