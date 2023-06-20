import './StartGameButton.css'

const StartGameButton = (props) => {
    const {startGame} = props;
    return (
        <button onClick={()=>startGame()} className="StartGameButton">Begin Adventure!</button>
    );
}

export default StartGameButton;