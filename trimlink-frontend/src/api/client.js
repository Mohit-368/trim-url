// Layer 1: API — the only place that knows how to talk HTTP to the backend.
// Nothing above this layer should ever call fetch() directly.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    // Sends/receives the httpOnly auth cookie set by the backend.
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Some responses (e.g. a 204, or a redirect) may not carry a JSON body.
  }

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export default request;
