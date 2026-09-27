// Frontend API service to communicate with the Node.js/MySQL backend

const API_BASE = '/api';

export async function checkBackendHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed with HTTP ${res.status}`);
  return res.json();
}

export async function checkDatabaseStatus() {
  const res = await fetch(`${API_BASE}/db-status`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `DB status check failed with HTTP ${res.status}`);
  return data;
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
  return data;
}

export async function createUser(user) {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create user');
  return data;
}
