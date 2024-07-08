

import { useNavigate } from "@remix-run/react";
import { useState } from "react";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-header">Movies Point</div>
      <input
        type="text"
        placeholder="Search for movies"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="search-bar"
      />
    </div>
  );
}
