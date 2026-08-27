import request from "./client";

export function getAnalyticsRequest(id) {
  return request(`/analytic/${id}`);
}
