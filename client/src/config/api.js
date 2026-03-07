const isLocalRuntime =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const defaultApiRoot = isLocalRuntime ? "http://localhost:5000" : "";
const API_ROOT = (process.env.REACT_APP_API_URL || defaultApiRoot).replace(/\/$/, "");

export const API_BASE = API_ROOT ? `${API_ROOT}/api` : "/api";
export const ADMIN_API_BASE = `${API_BASE}/admin`;
