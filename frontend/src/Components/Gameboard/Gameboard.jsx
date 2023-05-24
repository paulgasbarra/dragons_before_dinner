import { useState, useEffect } from 'react';
import './Gameboard.css';
import GameContext from '../../Hooks/GameContext';
import Heroes from '../Heroes/Heroes';
import StartGameButton from '../StartGameButton/StartGameButton';
import ChallengeCard from '../Challenges/ChallengeCard';

import monk from '../../images/monk.png';
import rogue from '../../images/rogue.png';
import warrior from '../../images/warrior.png';
import wizard from '../../images/wizard.png';
import broken_wagon_wheel from '../../images/broken_wagon_wheel.png';
import cat_in_tree from '../../images/cat_in_tree.png';
import drowning_dwarf from '../../images/drowning_dwarf.png';
import goblin_encampment from '../../images/goblin_encampment.png';
import tomb_raid from '../../images/tomb_raid.png';
import treasure from '../../images/treasure.png';

const Gameboard = () => {
    const [loading, setLoading] = useState(true);
    const [heroes, setHeroes] = useState([]);
    const [selectedHeroes, setSelectedHeroes] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [heroChosenForChallenge, setHeroChosenForChallenge] = useState("");
    const [challengeOptionChosen, setChallengeOptionChosen] = useState("");
    const [readyToRoll, setReadyToRoll] = useState(false);
    const [diceRolled, setDiceRolled] = useState(false);
    const [diceRoll, setDiceRoll] = useState(0);
    const [challengeResults, setChallengeResults] = useState("");
    const [roundEnded, setRoundEnded] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [treasures, setTreasures] = useState([]);

    // Get heroes from API
    useEffect(() => {
        const getHeroes = async () => {
            const heroesData = [
            {
              "name": "Monk",
              "archetype": "monk",
              "image": monk,
              "attributes": {
                "stealth": 0,
                "wisdom": 10,
                "intelligence": 5,
                "magic": 0,
                "strength": 5,
                "charm": 2,
                "stamina": 5,
                "luck": 10,
                "hitPoints": 16
              },    
              "description": "Experience and divine intervention are the tools of the venerable monk.",
              "selected": false,
              "treasures": [{name: null}, {name: null}, {name: null}]
            },
            {
              "name": "Rogue",
              "archetype": "rogue",
              "image": rogue,
              "attributes": {
                "stealth": 10,
                "wisdom": 0,
                "intelligence": 5,
                "magic": 2,
                "strength": 2,
                "charm": 10,
                "stamina": 0,
                "luck": 5,
                "hitPoints": 12
              },
              "description": "If the rogue can't sneak past, they'll charm their way through.",
              "selected": false,
              "treasures": [{name: null}, {name: null}, {name: null}],
            },
            {
              "name": "Warrior",
              "archetype": "warrior",
              "image": warrior,
              "attributes": {
                "stealth": 5,
                "wisdom": 5,
                "intelligence": 2,
                "magic": 0,
                "strength": 10,
                "charm": 5,
                "stamina": 10,
                "luck": 2,
                "hitPoints": 20
              },
              "description": "If it needs to be smashed or outlasted, the warrior is up for the job.",
              "selected": false,
              "treasures": [{name: null}, {name: null}, {name: null}],
            },
            {
              "name": "Wizard",
              "archetype": "wizard",
              "image": wizard,
              "attributes": {
                "stealth": 2,
                "wisdom": 2,
                "intelligence": 10,
                "magic": 10,
                "strength": 0,
                "charm": 3,
                "stamina": 2,
                "luck": 0,
                "hitPoints": 8
              },
              "description": "Great for solving difficult puzzles or bending reality to your will.",
              "selected": false,
              "treasures": [{name: null}, {name: null}, {name: null}]
            }
            ];
            setHeroes(heroesData);
            setLoading(false);
        };
        getHeroes();
    }, [])

    // Get challenges from API
    useEffect(() => {
      const getChallenges = async () => {
        const challengesData = [
          {
             "name":"Goblin Encampment",
             "shortName":"goblinEncampment",
             "status": "unselected",
             "description":"Maniacal laughter and the faint odor of dung reveal a gaggle of goblins nearby.",
              "image": goblin_encampment,
              "options": [
                {"description": "Raid the camp", "shortName": "raid", "attribute": "strength", "threshold": 10, "reward": {"name": "Lion Skin Trousers", "attribute":"strength", "value": 3}, "penalty": {"name": "Lose Health", "value": 20}},
                {"description": "Sneak past the camp", "shortName": "sneak", "attribute": "stealth", "threshold": 10, "reward": "poo", "penalty": {"name": "Lose Health", "value": 20}},
              ] 
          },
          {
             "name":"Drowning Dwarf",
             "shortName":"drowningDwarf",
             "status":"unselected",
             "description":"He can barely tread water with those little legs and a waterlogged beard is a heavy thing.",
             "image": drowning_dwarf,
             "options": [
              {"description": "Raid the camp", "shortName": "raid", "attribute": "strength", "threshold": 10, "reward": {"name": "Lion Skin Trousers", "attribute":"strength", "value": 3}, "penalty": {"name": "Lose Health", "value": 3}},
              {"description": "Sneak past the camp", "shortName": "sneak", "attribute": "stealth", "threshold": 10, "reward": {"name": "Rabbit's Foot", "attribute":"luck", "value": 3}, "penalty": {"name": "Lose Health", "value": 3}},
            ] 
            },
          {
             "name":"Tomb Raid",
             "shortName":"tombRaid",
             "status":"unselected",
             "description":"A saucy rogue sporting dual crossbows says the local graves are loaded with loot. ", 
             "image": tomb_raid,
             "options": [
              {"description": "Raid the camp", "shortName": "raid", "attribute": "strength", "threshold": 10, "reward": {"name": "Lion Skin Trousers", "attribute":"strength", "value": 3}, "penalty": {"name": "Lose Health", "value": 3}},
              {"description": "Sneak past the camp", "shortName": "sneak", "attribute": "stealth", "threshold": 10, "reward": {"name": "Rabbit's Foot", "attribute":"luck", "value": 3}, "penalty": {"name": "Lose Health", "value": 3}},
            ] 
            },
          {
             "name":"Cat Rescue",
             "shortName":"catRescue",
             "status":"unselected",
             "description":"Sir Purrsalot has reached fearful heights.",
             "image": cat_in_tree,
             "options": [
              {"description": "Raid the camp", "shortName": "raid", "attribute": "strength", "threshold": 10, "reward": {"name": "Lion Skin Trousers", "attribute":"strength", "value": 3}, "penalty": {"name": "Lose Health", "value": 3}},
              {"description": "Sneak past the camp", "shortName": "sneak", "attribute": "stealth", "threshold": 10, "reward": {"name": "Rabbit's Foot", "attribute":"luck", "value": 3}, "penalty": {"name": "Lose Health", "value": 3}},
            ]
          },
          {
             "name":"Broken Wagon Wheel",
             "shortName":"brokenWagonWheel",
             "status":"unselected",
             "description":"An old friar needs roadside assitance. Got a spare?",
             "image": broken_wagon_wheel,
             "options": [
              {"description": "Raid the camp", "shortName": "raid", "attribute": "strength", "threshold": 10, "reward": {"name": "Lion Skin Trousers", "attribute":"strength", "value": 3}, "penalty": {"name": "Lose Health", "value": 3}},
              {"description": "Sneak past the camp", "shortName": "sneak", "attribute": "stealth", "threshold": 10, "reward": {"name": "Rabbit's Foot", "attribute":"luck", "value": 3}, "penalty": {"name": "Lose Health", "value": 3}},
            ]
          }
       ]
       setChallenges(challengesData)
      };
      getChallenges();
    }, [])

    // get treasures from API
    useEffect(() => {
      const getTreasures = async () => {
        const treasureData = [
          {
            "name": "Cool Hat",
            "shortName": "CoolHat",
            "attribute": "Charm",
            "value": 1, 
            "image": treasure,
          },  
          {
            "name": "Breath Freshener",    
            "shortName": "BreathFreshener",    
            "attribute": "Charm",    "value": 3  },  {    "name": "Diploma",    "shortName": "Diploma",    "attribute": "Intellegence",    "value": 1  },  {    "name": "Electric Headband",    "shortName": "ElectricHeadband",    "attribute": "Intellegence",    "value": 3  },  {    "name": "Rabits Foot",    "shortName": "RabitsFoot",    "attribute": "Luck",    "value": 1  },  {    "name": "Superstitious Dance",    "shortName": "SuperstitiousDance",    "attribute": "Luck",    "value": 3  },  {    "name": "Pointy Hat",    "shortName": "PointyHat",    "attribute": "Magic",    "value": 1  },  {    "name": "Circle of Cirse",    "shortName": "CircleofCirse",    "attribute": "Magic",    "value": 3  },  {    "name": "Sweat Band",    "shortName": "SweatBand",    "attribute": "Stamina",    "value": 1  },  {    "name": "Sandles of Endurance",    "shortName": "SandlesofEndurance",    "attribute": "Stamina",    "value": 3  },  {    "name": "Cloak of Shadows",    "shortName": "CloakofShadows",    "attribute": "Stealth",    "value": 1  },  {    "name": "Padded Slippers",    "shortName": "PaddedSlippers",    "attribute": "Stealth",    "value": 3  },  {    "name": "Grizzly Fur Drink",    "shortName": "GrizzlyFurDrink",    "attribute": "Strength",    "value": 1  },  {    "name": "Lion Skin Trousers",    "shortName": "LionSkinTrousers",    "attribute": "Strength",    "value": 3  },  {    "name": "Strokable Beard",    "shortName": "StrokableBeard",    "attribute": "Wisdom",    "value": 1  },  {    "name": "Socrates' Cloak",    "shortName": "SocratesCloak",    "attribute": "Wisdom",    "value": 3  }]
        setTreasures(treasureData)
      };
      }, []);

    useEffect(() => {
      if (challengeOptionChosen && heroChosenForChallenge) {
        setReadyToRoll(true);
        return;
      }
      setReadyToRoll(false);
    }, [challengeOptionChosen, heroChosenForChallenge])

    const unselectAllHeroes = () => {
      heroes.forEach((hero) => hero.selected = false);
    };
        
    const handleHeroClick = (heroName) => {
      // if game has started, set the hero chosen for the challenge
      const hero = heroes.find((hero) => hero.name === heroName);
      if (gameStarted) {
        unselectAllHeroes();
        hero.selected = true; 
        setHeroChosenForChallenge(hero);
        return;
      }
      // if game has not started, add or remove hero from selected heroes, update hero's selected status
      if (selectedHeroes.includes(heroName)){
        hero.selected = false;
        setSelectedHeroes(selectedHeroes.filter((hero) => hero !== heroName));
        return;
      } 
      hero.selected = true;
      setSelectedHeroes([...selectedHeroes, heroName]);
    };

    const startGame = () => {
      const filteredHeroes = heroes.filter((hero) => selectedHeroes.includes(hero.name));
      
      if (filteredHeroes.length !== 1) {
        setSelectedHeroes([]);
        unselectAllHeroes();
      }
      setHeroes(filteredHeroes);
      setCurrentChallenge(challenges[0]);
      setGameStarted(true);
    }

    const handleOptionClick = (option) => {
      setChallengeOptionChosen(option);
    }

    const rollDice = () => {
      const heroStat = heroChosenForChallenge.attributes[challengeOptionChosen.attribute];
      const threshold = challengeOptionChosen.threshold;
      const roll = Math.floor(Math.random() * 10) + 1;
      setDiceRoll(roll);
      if (roll + heroStat >= threshold) {
        setChallengeResults("Congratulations! You succeeded! You have earned a reward of " + challengeOptionChosen.reward.name + "!");
        setDiceRolled(true);
      } else {
        setChallengeResults("Oh no! You failed! You have earned a penalty of " + challengeOptionChosen.penalty.name + "!");
        setDiceRolled(true);
        // if penalty is lose health, reduce hero's health by penalty value
        if (challengeOptionChosen.penalty.name === "Lose Health") {
          const updatedHeroes = heroes.map((hero) => {
            if (hero.name === heroChosenForChallenge.name) {
              hero.attributes.hitPoints -= challengeOptionChosen.penalty.value;
              if (hero.attributes.hitPoints <= 0) {
                hero.attributes.hitPoints = 0;
                hero.status = "dead";
                alert(`Your ${hero.name} has died!`);
              }
            }
            return hero;
          });
          //remove dead heroes from the game
          const filteredHeroes = updatedHeroes.filter((hero) => hero.status !== "dead");
          if (filteredHeroes.length === 0) {
            alert("All your heroes have died! Game over!")
            setGameStarted(false);
            return;
          }
          setHeroes(filteredHeroes);
        }
      }
      setRoundEnded(true);
      
    }

    const endRound = () => {
      // unselect all heroes, unless there is only one hero
      if (heroes.length > 1){
        unselectAllHeroes();
      }
      // reset challenge option chosen, hero chosen for challenge, dice rolled, challenge results, ready to roll, round ended
      setChallengeOptionChosen("");
      setHeroChosenForChallenge("");
      setDiceRolled(false);
      setChallengeResults("");
      setReadyToRoll(false);
      setRoundEnded(false);
      // remove current challenge from list of challenges
      const filteredChallenges = challenges.filter((challenge) => challenge.name !== currentChallenge.name);
      setChallenges(filteredChallenges);
      // if there are no more challenges, end the game
      if (filteredChallenges.length === 0) {
        alert("You have completed all the challenges! You win!");
        setGameStarted(false);
        return;
      }
      // if there are more challenges, choose a new challenge
      setCurrentChallenge(filteredChallenges[Math.floor(Math.random() * filteredChallenges.length)]);
    }



    return (
      <div>
      <GameContext.Provider value={{ heroes, challenges, gameStarted }}>
        {!gameStarted && 
          <div className="Gameboard">
            <div>
              <h2>Choose your party...</h2>
              <Heroes heroes={heroes} loading={loading} handleHeroClick={handleHeroClick} />
              {selectedHeroes.length > 0 && !gameStarted && <StartGameButton startGame={startGame} />}
            </div>
          </div>
        }
        {gameStarted && 
          <div className='Gameboard gameStarted'>
            <div className="left">
              <Heroes heroes={heroes} loading={loading} handleHeroClick={handleHeroClick} />
            </div>          
            <div className="center">
              <div>Chosen challenge: {challengeOptionChosen.description || ""}</div>
              <div>Chosen hero: {heroChosenForChallenge.name || ""}</div>
              {readyToRoll && 
                <div>
                  <div>Your {heroChosenForChallenge.name} will attempt to {challengeOptionChosen.description} using their {challengeOptionChosen.attribute} of {heroChosenForChallenge.attributes[challengeOptionChosen.attribute]}.</div>
                  <div>They will need to roll a {challengeOptionChosen.threshold - heroChosenForChallenge.attributes[challengeOptionChosen.attribute]} or greater.</div>
                  {!diceRolled && <button onClick={()=>rollDice()}>Roll Dice</button>}
                  {diceRolled && <div>
                    <div>{diceRoll}</div>
                    <div>{challengeResults}</div>
                    </div>}
                  {roundEnded && <button onClick={()=>endRound()}>End Round</button>}
                </div>
              }
            </div>
            <div className="right">
              <ChallengeCard challenge={currentChallenge} handleOptionClick={handleOptionClick}/>
            </div>
          </div>
        }
      </GameContext.Provider>
    </div>
    )
}

export default Gameboard;