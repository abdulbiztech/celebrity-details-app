import React, { useState } from "react";

const AccordionItem = ({
  user,
  isOpen,
  onToggle,
  onDelete,
  onSave,
  onCancel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="accordion-item">
      <div
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="user-info">
          <img src={user.picture} alt={user.first} className="user-image" />
          <span className="user-name">
            {user.first} {user.last}
          </span>
        </div>
        <span className={`accordion-arrow ${isOpen ? "active" : ""}`}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      {isOpen && (
        <div className={`accordion-content ${isOpen ? "active" : ""}`}>
          {isEditing ? (
            <div className="edit-mode">
              <input
                type="text"
                name="first"
                value={editedUser.first}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="last"
                value={editedUser.last}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
              {/* Add more editable fields as needed */}
              <div className="accordion-actions">
                <button onClick={() => onSave(editedUser)}>Save</button>
                <button
                  onClick={() => {
                    onCancel();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-card">
              <div className="profile-row">
                <strong>Age:</strong>
                <span>{user.age}</span>
              </div>
              <div className="profile-row">
                <strong>Gender:</strong>
                <span>{user.gender}</span>
              </div>
              <div className="profile-row">
                <strong>Country:</strong>
                <span>{user.country}</span>
              </div>
              <div className="profile-description">
                <strong>Description:</strong>
                <p>{user.description}</p>
              </div>
              <div className="accordion-actions">
                <button onClick={handleEditToggle}>Edit</button>
                <button className="btn-red" onClick={() => onDelete(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
