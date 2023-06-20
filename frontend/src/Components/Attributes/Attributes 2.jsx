import "./Attributes.css";

const Attributes = ({attributes}) => {
  return (
    <div className="Attributes">
      {attributes && Object.keys(attributes).slice(0,8).map((attribute) => (
      <div className="AttributeBar" key={attribute}>
          <div className="stat-bar">
              <div className="attribute-name">{attribute}</div>
              <div className="stat" style={
                {"width": attributes[attribute] /10 * 100 + "%"}
              } />
          </div>
      </div>
      ))}
    </div>
  );
};

export default Attributes;