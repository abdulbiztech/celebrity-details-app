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
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset the edited user state when editing starts
      setEditedUser(user);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));

    // Validate input fields
    if (name === "country" && !isNaN(value)) {
      alert("Country cannot be a number.");
      return;
    }
    if (
      name === "first" ||
      name === "last" ||
      name === "gender" ||
      name === "description"
    ) {
      if (!value.trim()) {
        alert(
          `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty.`
        );
        return;
      }
    }

    // Enable save button if user details have changes
    const hasChanges = JSON.stringify(user) !== JSON.stringify(editedUser);
    setIsSaveEnabled(hasChanges);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSave = () => {
    onSave(editedUser); //  onSave function with the editedUser
    setIsEditing(false); // Close the edit mode
  };

  return (
    <div className="accordion-item">
      <div
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="user-info">
          <img
            src={user.picture}
            alt={`${user.first} ${user.last}`}
            className="user-image"
          />
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
              <input
                type="text"
                name="gender"
                value={editedUser.gender}
                onChange={handleInputChange}
                placeholder="Gender"
              />
              <input
                type="text"
                name="country"
                value={editedUser.country}
                onChange={handleInputChange}
                placeholder="Country"
              />
              <textarea
                name="description"
                value={editedUser.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
              <div className="accordion-actions">
                <button
                  onClick={handleSave} // handleSave method
                  disabled={!isSaveEnabled}
                >
                  Save
                </button>
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
              <div className="row align-items-center">
                <div className="col-4">
                  <label>
                    <strong>Age</strong>
                  </label>
                  <div className="value">
                    {calculateAge(user.dob)
                      ? `${calculateAge(user.dob)} Years`
                      : "Not specified"}
                  </div>
                </div>
                <div className="col-4">
                  <label>
                    <strong>Gender</strong>
                  </label>
                  <div className="value">{user.gender || "Rather not say"}</div>
                </div>
                <div className="col-4">
                  <label>
                    <strong>Country</strong>
                  </label>
                  <div className="value">{user.country}</div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-4">
                  <label>
                    <strong>Description</strong>
                  </label>
                </div>
                <div className="col-8">
                  <p>{user.description}</p>
                </div>
              </div>
              <div className="button-group">
                <button className="btn-edit" onClick={handleEditToggle}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(user.id)}
                >
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
