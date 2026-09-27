import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themecontext";

function Navbar() {
  const { theme } = useContext(ThemeContext);

  const navStyle = {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    borderBottom: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
    backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  };

  const getLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    fontWeight: isActive ? "bold" : "normal",
    backgroundColor: isActive
      ? theme === "dark"
        ? "#374151"
        : "#e5e7eb"
      : "transparent",
    color: theme === "dark" ? "#f9fafb" : "#111827",
  });

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={getLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/users" style={getLinkStyle}>
        Users
      </NavLink>
      <NavLink to="/backend-users" style={getLinkStyle}>
        MySQL Users
      </NavLink>
      <NavLink to="/search" style={getLinkStyle}>
        Search Filter
      </NavLink>
      <NavLink to="/form" style={getLinkStyle}>
        Form
      </NavLink>
      <NavLink to="/password-generator" style={getLinkStyle}>
        Password Generator
      </NavLink>
    </nav>
  );
}

export default Navbar;
