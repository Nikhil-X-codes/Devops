import { useState, useEffect } from "react";
import {
  checkBackendHealth,
  checkDatabaseStatus,
  fetchUsers,
  createUser,
} from "../services/api";

function BackendUsers() {
  const [backendStatus, setBackendStatus] = useState("checking...");
  const [dbStatus, setDbStatus] = useState("checking...");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const refreshStatusAndUsers = async () => {
    setError(null);
    try {
      const health = await checkBackendHealth();
      setBackendStatus(`Online (${health.message})`);
    } catch (err) {
      setBackendStatus(`Offline (${err.message})`);
    }

    try {
      const db = await checkDatabaseStatus();
      setDbStatus(`Connected (Server Time: ${new Date(db.serverTime).toLocaleString()})`);
    } catch (err) {
      setDbStatus(`Disconnected (${err.message})`);
    }

    try {
      const data = await fetchUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      // Don't overwrite general error if backend isn't up
      console.warn("Could not fetch users:", err.message);
    }
  };

  useEffect(() => {
    refreshStatusAndUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setError(null);
    setSuccessMsg("");

    try {
      await createUser({ name, email });
      setSuccessMsg(`User "${name}" added successfully!`);
      setName("");
      setEmail("");
      const updated = await fetchUsers();
      setUsers(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    maxWidth: "600px",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "0.8rem",
    borderRadius: "0.25rem",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2>Backend & MySQL Integration</h2>
      
      {/* Connection diagnostics card */}
      <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
        <h3>Connection Status</h3>
        <p>
          <strong>Node.js Server: </strong>
          <span style={{ color: backendStatus.startsWith("Online") ? "#22c55e" : "#ef4444" }}>
            {backendStatus}
          </span>
        </p>
        <p>
          <strong>MySQL Database: </strong>
          <span style={{ color: dbStatus.startsWith("Connected") ? "#22c55e" : "#ef4444" }}>
            {dbStatus}
          </span>
        </p>
        <button onClick={refreshStatusAndUsers}>Refresh Status</button>
      </div>

      {/* Add User Form */}
      <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
        <h3>Add User to MySQL</h3>
        {error && <div style={{ color: "#ef4444", marginBottom: "0.5rem" }}>{error}</div>}
        {successMsg && <div style={{ color: "#22c55e", marginBottom: "0.5rem" }}>{successMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="e.g. Alice"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="e.g. alice@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>
      </div>

      {/* User list from DB */}
      <div style={cardStyle}>
        <h3>Users in MySQL Database ({users.length})</h3>
        {users.length === 0 ? (
          <p>No users found or database not connected yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {users.map((u) => (
              <li
                key={u.id}
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <strong>{u.name}</strong> <br />
                  <small style={{ opacity: 0.8 }}>{u.email}</small>
                </div>
                <div>
                  <small style={{ opacity: 0.6 }}>ID: #{u.id}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BackendUsers;
