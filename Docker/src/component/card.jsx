import { useContext } from "react";
import "./card.css";
import { ThemeContext } from "../context/themecontext";

function Card({ productname, productprice }) {
  
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        color: theme === "dark" ? "#f9fafb" : "#111827",
        border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
      }}
    >
      <div className="card-content">
        <h2>{productname}</h2>
        <h3>{productprice}</h3>

        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
      </div>
    </div>
  );
}

export default Card;