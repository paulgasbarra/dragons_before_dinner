import ChallengeCard from "./ChallengeCard";
import "./Challenges.css";  


const Challenges = (props) => {
  const {challenges, loading, handleOptionClick} = props;
  return (
    <div className="Challenges">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="lineup">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.shortName} challenge={challenge} handleOptionClick={handleOptionClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Challenges;