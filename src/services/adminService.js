const API_BASE = "http://localhost:5000";

export const adminService = {
  // Fetch segment-specific data (e.g. notices, advisors, etc.) on demand
  fetchSegment: async (apiPath) => {
    const res = await fetch(`${API_BASE}${apiPath}`);
    if (!res.ok) throw new Error(`Failed to fetch from ${apiPath}`);
    return res.json();
  },

  // Save a new record or update an existing one
  saveRecord: async (apiPath, recordId, data) => {
    const url = recordId
      ? `${API_BASE}${apiPath}/${recordId}`
      : `${API_BASE}${apiPath}`;
    const method = recordId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save record");
    return res.json();
  },

  // Delete a record by ID
  deleteRecord: async (apiPath, id) => {
    const res = await fetch(`${API_BASE}${apiPath}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete record");
    return true;
  },

  // Patch record status (e.g. approve/reject requests)
  patchStatus: async (apiPath, id, action) => {
    const res = await fetch(`${API_BASE}${apiPath}/${id}/${action}`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error(`Failed to update status to ${action}`);
    return res.json();
  },
};
