import request from "./client";

export function registerRequest({ username, email, password }) {
  return request("/auth/register", {
    method: "POST",
    body: { username, email, password },
  });
}

export function loginRequest({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function logoutRequest() {
  return request("/auth/logout", { method: "POST" });
}

// The auth cookie is httpOnly (invisible to JS by design), so this is how
// the app finds out — on load, or after a refresh — whether a session
// already exists.
export function meRequest() {
  return request("/auth/me");
}
