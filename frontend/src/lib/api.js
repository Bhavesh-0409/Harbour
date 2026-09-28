const BASE = import.meta.env.VITE_API_URL || "";

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const api = {
  submitIntake: (body) => req("/intake", { method: "POST", body: JSON.stringify(body) }),
  getCase: (id) => req(`/cases/${id}`),
  listCases: (department) => req(`/cases${department ? `?department=${encodeURIComponent(department)}` : ""}`),
  openCase: (id, staff) => req(`/cases/${id}/open`, { method: "POST", body: JSON.stringify({ staff }) }),
  shareSummary: (id, approved) => req(`/cases/${id}/share`, { method: "POST", body: JSON.stringify({ approved }) }),
  revoke: (id) => req(`/cases/${id}/revoke`, { method: "POST" }),
  capacity: () => req("/capacity"),
};
