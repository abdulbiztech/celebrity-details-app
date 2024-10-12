import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import AccordionItem from "./AccordionItem";
import data from "../data.json";
import "../App.css";

const CelebrityList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    setUsers(data);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredUsers = users.filter((user) =>
      (user.first + " " + user.last).toLowerCase().includes(term.toLowerCase())
    );
    setNoResults(filteredUsers.length === 0 && term !== "");
  };

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleSave = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setActiveIndex(null);
  };

  return (
    <div>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      {noResults && (
        <div className="alert alert-warning" role="alert">
          No results found for "{searchTerm}". Please try another name.
        </div>
      )}
      <div className="accordion-container">
        {users
          .filter((user) =>
            (user.first + " " + user.last)
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((user, index) => (
            <AccordionItem
              key={user.id}
              user={user}
              isOpen={index === activeIndex}
              onToggle={() => handleToggle(index)}
              onDelete={handleDelete}
              onSave={handleSave}
              onCancel={() => setActiveIndex(null)}
            />
          ))}
      </div>
    </div>
  );
};

export default CelebrityList;
