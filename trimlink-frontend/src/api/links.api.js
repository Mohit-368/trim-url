import request from "./client";

export function getLinksRequest() {
  return request("/links");
}

export function createLinkRequest({ original_link, trim_link, expires_at }) {
  return request("/links", {
    method: "POST",
    body: { original_link, trim_link, expires_at },
  });
}

export function deleteLinkRequest(id) {
  return request(`/links/${id}`, { method: "DELETE" });
}
