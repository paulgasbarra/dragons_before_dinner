import { useContext } from "react";
import HeroCard from "./HeroCard";
import "./Heroes.css";  
import GameContext from "../../Hooks/GameContext";


const Heroes = (props) => {
  const {heroes, loading, handleHeroClick} = props;
  const gameStartedClass = useContext(GameContext).gameStarted ? "gameStarted" : "";

  return (
    <div className="Heroes">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={`lineup ${gameStartedClass}`}>
          {heroes.map((hero) => (
            <HeroCard key={hero.name} hero={hero} handleHeroClick={handleHeroClick}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Heroes;
