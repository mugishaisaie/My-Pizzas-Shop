import React, { useState } from "react";
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
        placeholder="Search order"
        onChange={(e) => setQuery(e.target.value)}
        className="border-yellow-100 w-28 sm:focus:w-72 bg-yellow-100 px-4 py-2 rounded-full transition-all duration-300 placeholder-text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-100 sm:w-64 "
      />
    </form>
  );
}

export default SearchOrder;
