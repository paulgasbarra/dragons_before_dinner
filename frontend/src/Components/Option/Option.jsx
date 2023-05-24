import "./Option.css";

const Option = (props) => {
    const {option, handleOptionClick} = props;
    return (
        <div className="option" onClick={()=>handleOptionClick(option)}>
            <div className="description">{option.description}</div>
            <div className="test">
                <div className="attribute">{option.attribute}</div>
                <div>:</div>
                <div className="threshold">{option.threshold}</div>
            </div>
            <div className="consequences">
                <div className="reward" key="reward">{option.reward.name}
                    <div>{option.reward.attribute}: +{option.reward.value}</div>
                </div>
                <div className="penalty" key="penalty">{option.penalty.name}:{option.penalty.value}</div>
            </div>
        </div>
    );
}

export default Option;