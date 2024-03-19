import React, { useState } from "react";

const attributes = {
  stealth: 0,
  wisdom: 0,
  intelligence: 0,
  magic: 0,
  strength: 0,
  charm: 0,
  stamina: 0,
  luck: 0,
  hitPoints: 0,
};

const CardCreationForm = () => {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    image_url: "",
    creator: "", // Assuming this will be set programmatically or via user selection
    card_type: "hero", // Default card type
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cardDetails);
    // Submit your form data to your backend/server here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={cardDetails.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image_url">Image URL:</label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={cardDetails.image_url}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="card_type">Card Type:</label>
        <select
          id="card_type"
          name="card_type"
          value={cardDetails.card_type}
          onChange={handleInputChange}
        >
          <option value="hero">Hero</option>
          <option value="challenge">Challenge</option>
          <option value="boss">Boss</option>
          <option value="treasure">Treasure</option>
        </select>
      </div>

      {/* Conditional Form Fields Based on Card Type */}
      {cardDetails.card_type === "hero" && (
        <div>
          <label htmlFor="archetype">Archetype:</label>
          {/* archetype is maybe it's own model? */}
          <input
            type="text"
            id="archetype"
            name="archetype"
            value={cardDetails.archetype}
            onChange={handleInputChange}
            required
          />

          {/* Attributes inputs */}
          {Object.keys(attributes).map((attribute) => (
            <div key={attribute}>
              <label htmlFor={attribute}>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}:
              </label>
              <input
                type="number"
                id={attribute}
                name={attribute}
                value={attributes[attribute]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={cardDetails.description}
            onChange={handleInputChange}
            required
          />

          <label>
            <input
              type="checkbox"
              name="selected"
              checked={cardDetails.selected}
              onChange={handleInputChange}
            />
            Selected
          </label>
        </div>
      )}
      {cardDetails.card_type === "challenge" && (
        <div>
          {/* Add challenge-specific fields here */}
          <label htmlFor="difficulty">Difficulty:</label>
          <input
            type="number"
            id="difficulty"
            name="difficulty"
            onChange={handleInputChange}
          />
        </div>
      )}
      {/* Repeat for other types as needed */}

      <button type="submit">Create Card</button>
    </form>
  );
};

export default CardCreationForm;
