import { useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  meRequest,
} from "../api/auth.api";

// Layer 2: Hooks — the only thing UI components import. Combines the
// api layer (network) with the state layer (shared store) so pages
// never touch fetch() or dispatch() themselves.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { state, dispatch } = ctx;

  const checkAuth = useCallback(async () => {
    try {
      const data = await meRequest();
      dispatch({ type: "SET_USER", payload: data.user });
    } catch {
      dispatch({ type: "CLEAR_USER" });
    }
  }, [dispatch]);

  // On first mount (e.g. a hard refresh), ask the backend whether the
  // httpOnly cookie still represents a valid session.
  useEffect(() => {
    if (!state.initialized) {
      checkAuth();
    }
  }, [state.initialized, checkAuth]);

  const login = useCallback(
    async (email, password) => {
      const data = await loginRequest({ email, password });
      dispatch({ type: "SET_USER", payload: data.user });
      return data.user;
    },
    [dispatch]
  );

  const register = useCallback(
    async (username, email, password) => {
      const data = await registerRequest({ username, email, password });
      dispatch({ type: "SET_USER", payload: data.user });
      return data.user;
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    await logoutRequest();
    dispatch({ type: "CLEAR_USER" });
  }, [dispatch]);

  return {
    user: state.user,
    isAuthenticated: Boolean(state.user),
    initialized: state.initialized,
    login,
    register,
    logout,
  };
}
