import './Treasures.css';

const Treasures = (props) => {
    const {treasures} = props;

    return (
        <div className="treasures">
            {treasures.map((treasure, index) => (
                <div className="treasure" key={"treasure_" + index}>
                    {treasure && <img src={treasure.image} alt={treasure.name} />}
                </div>
            ))}
        </div>
    );
}

export default Treasures;