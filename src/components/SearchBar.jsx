import React from "react";
import "../App.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search user"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
