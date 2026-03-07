const API_ROOT = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");

export const API_BASE = `${API_ROOT}/api`;
export const ADMIN_API_BASE = `${API_BASE}/admin`;

