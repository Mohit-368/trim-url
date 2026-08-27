import { useContext, useCallback } from "react";
import { LinksContext } from "../store/LinksContext";
import {
  getLinksRequest,
  createLinkRequest,
  deleteLinkRequest,
} from "../api/links.api";

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  const { state, dispatch } = ctx;

  const fetchLinks = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await getLinksRequest();
      dispatch({ type: "FETCH_SUCCESS", payload: data.links });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error.data?.message || error.message,
      });
    }
  }, [dispatch]);

  const createLink = useCallback(
    async ({ original_link, trim_link, expires_at }) => {
      const data = await createLinkRequest({
        original_link,
        trim_link,
        expires_at,
      });
      dispatch({ type: "ADD_LINK", payload: data.link });
      return data.link;
    },
    [dispatch]
  );

  const removeLink = useCallback(
    async (id) => {
      await deleteLinkRequest(id);
      dispatch({ type: "REMOVE_LINK", payload: id });
    },
    [dispatch]
  );

  return {
    links: state.links,
    status: state.status,
    error: state.error,
    fetchLinks,
    createLink,
    removeLink,
  };
}
