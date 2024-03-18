import { useEffect, useState } from "react";

const DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

const ViewCards = () => {
  const user_id = 0; // get user id from session
  const [loadedCards, setLoadedCards] = useState([]);
  // fetch a list of cards that the user has created
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://${DATABASE_URL}/api/cards`);
        console.log(response);
        const data = await response.json();
        setLoadedCards(data.cards);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCards();
  }, []);

  return (
    <div>
      <h1>View Cards</h1>
      <h2>Viewing {loadedCards.length} cards.</h2>
      <ul>
        {loadedCards &&
          loadedCards.map((card) => {
            return (
              <li>
                <h2>{card.name}</h2>
                <p>{card.description}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ViewCards;
