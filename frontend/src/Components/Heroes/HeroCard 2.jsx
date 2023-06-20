import Attributes from '../Attributes/Attributes';
import Card from '../Card/Card';
import Treasures from '../Treasures/Treasures';

const HeroCard = (props) => {
    const {hero: {name, image, attributes, description, selected, treasures}} = props;
    const {handleHeroClick} = props;

    const clickHandler = () => {
        handleHeroClick(name);
    };
    
    return (
        <Card clickHandler={clickHandler} selected={selected} image={image} image_alt={name} >
            <div className="heart">
                <div className="hitpoints">{attributes.hitPoints}</div>
            </div>
            <div className="name">{name}</div>
            <p>{description}</p>
            {attributes && <Attributes attributes={attributes} />}
            <Treasures treasures={treasures} />         
        </Card>
    )
}

export default HeroCard;