import { useEffect, useState } from "react";
import names from "../names.json";

function SearchFilter() {
  const [query, setquery] = useState("");
  const [filteruser, filtername] = useState("");

  useEffect(() => {
    const result = names.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );

    filtername(result);
  }, [query]);

  return (
    <>
      <h1>Search Names</h1>

      <input
        type="text"
        placeholder="Search name..."
        value={query}
        onChange={(e) => setquery(e.target.value)}
      />

      <div>
        {query && filteruser.map((name) => (
          <p>{name}</p>
        ))}
      </div>

    </>
  );
}

export default SearchFilter;