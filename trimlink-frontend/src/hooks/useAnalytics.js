import { useState, useCallback } from "react";
import { getAnalyticsRequest } from "../api/analytics.api";

// This one doesn't need global state — only the analytics page cares
// about a single link's stats — so it keeps its own local state instead
// of going through a Context store.
export function useAnalytics() {
  const [link, setLink] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async (id) => {
    setStatus("loading");
    setError(null);
    try {
      const data = await getAnalyticsRequest(id);
      setLink(data.link);
      setStatus("success");
    } catch (err) {
      setError(err.data?.message || err.message);
      setStatus("error");
    }
  }, []);

  return { link, status, error, fetchAnalytics };
}
