import Card from "../Card/Card";
import Option from "../Option/Option";

const ChallengeCard = (props) => {
    const {challenge: {name, description, image, options}} = props;
    const {handleOptionClick} = props;

    return(
    <Card image={image} image_alt={name}>
        <h3>{name}</h3>
        <p>{description}</p>
        {options && options.map((option) => (
            <Option key={option.shortName} option={option} handleOptionClick={handleOptionClick} />
        ))}
    </Card>)
}

export default ChallengeCard;