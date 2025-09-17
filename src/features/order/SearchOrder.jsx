import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="Text-sm focus:ring-opacity-50 w-28 rounded-lg border-0 bg-yellow-100 p-4 text-stone-400 transition-all duration-300 placeholder:text-stone-300 focus:bg-white focus:ring-4 focus:ring-yellow-300 focus:outline-none sm:w-64 sm:focus:w-72"
        placeholder="Search order"
      />
    </form>
  );
}

export default SearchOrder;
