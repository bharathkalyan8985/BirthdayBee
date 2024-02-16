// BirthdayCards.js

import React, { useState, useEffect } from "react";
import "./BirthdayCards.css";

const BirthdayCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch birthday card images
    fetch("http://localhost:3001/api/birthday-cards") // Update this URL
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error("Error fetching birthday cards:", error));
  }, []);

  return (
    <div className="birthday-cards-container">
      <h2>Birthday Cards</h2>
      <div className="cards">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <img src={card.imageUrl} alt={`Birthday Card ${card.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayCards;
