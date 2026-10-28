import { useCallback, useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api.js";
import useAutoRefresh from "./useAutoRefresh.js";

const useAnalytics = (days) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Returns a function that stops this request's result from being applied
  const load = useCallback(() => {
    let cancelled = false;

    api
      .get("/analytics", { params: { days } })
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
          setError("");
        }
      })
      .catch((err) => !cancelled && setError(getApiErrorMessage(err)));

    return () => {
      cancelled = true;
    };
  }, [days]);

  useEffect(load, [load]);

  // Pick up new views and clicks without reloading the page
  useAutoRefresh(load);

  return { data, error };
};

export default useAnalytics;
