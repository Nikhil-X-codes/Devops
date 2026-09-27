import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Card from "./component/card";
import UserList from "./component/user";
import BackendUsers from "./component/backendusers";
import SearchFilter from "./component/userfilter";
import Forms from "./component/form";
import { ThemeContext } from "./context/themecontext";
import Pass from "./Project1/pass";

function Home({ count, addvalue }) {
  return (
    <div>
      <h1>Hello</h1>
      <h2>Count: {count}</h2>
      <button onClick={addvalue}>Click Me</button>
      <div style={{ marginTop: "1rem" }}>
        <Card productname="Laptop" productprice="₹50,000" />
      </div>
    </div>
  );
}

function App() {
  
  const { theme, setTheme } = useContext(ThemeContext);
  const [count, setcount] = useState(0);

  const addvalue = () => {
    setcount(count + 1);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const appStyle = {
    minHeight: "100vh",
    backgroundColor: theme === "dark" ? "#111827" : "#f3f4f6",
    color: theme === "dark" ? "#f9fafb" : "#111827",
    transition: "all 0.3s ease",
  };

  return (
    <div style={appStyle}>
      <Navbar />

      <div style={{ padding: "0 1.5rem 1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={toggleTheme}>
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home count={count} addvalue={addvalue} />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/backend-users" element={<BackendUsers />} />
          <Route path="/search" element={<SearchFilter />} />
          <Route path="/form" element={<Forms />} />
          <Route path="/password-generator" element={<Pass />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
        
      </div>
    </div>
  );
}

export default App;