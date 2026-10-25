import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api.js";

const useAnalytics = (days) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
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

  return { data, error };
};

export default useAnalytics;
