import React, {useState, useEffect} from "react";
import "./Card.css";

const Card = (props) => {
    const {clickHandler = ()=>{}, image, image_alt, selected} = props;

    const [className, setClassName] = useState("Card");

    useEffect (() => {
        setClassName(selected ? "Card selected" : "Card");
    }, [selected]);

    return (
        <div className={className} onClick={() => clickHandler()}>
            <div className="portrait">
                <img src={image} alt={image_alt} />
            </div>
            <div style={{"position": "relative"}}className="card-body">
                {props.children}
            </div>
        </div>
    );
}

export default Card;