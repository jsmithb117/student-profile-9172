const Name = (props) => {
  const collapsedDisplay = "+";
  const expandedDisplay = "-";
  const toggleExpanded = () => props.setExpanded(!props.expanded);

  return (
    <div className="name-expand">
      <div className="fullname">{props.fullname}</div>
      <div className="expand">
        {!props.expanded && (
          <button className="plus" onClick={toggleExpanded}>
            {collapsedDisplay}
          </button>
        )}
        {props.expanded && (
          <button className="minus" onClick={toggleExpanded}>
            {expandedDisplay}
          </button>
        )}
      </div>
    </div>
  );
};

export default Name;
