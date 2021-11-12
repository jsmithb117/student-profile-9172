import { useState } from "react";
import Score from "./Score";

const Student = (props) => {
  const gradesInts = props.student.grades.map((grade) => parseInt(grade));
  const average = gradesInts.reduce((a, b) => a + b) / gradesInts.length;
  const fullname =
    `${props.student.firstName} ${props.student.lastName}`.toUpperCase();
  const includesSearchText = fullname.includes(props.searchText.toUpperCase());
  const hasSearchText = props.searchText.length === 0 ? false : true;
  const [expanded, setExpanded] = useState(false);
  const collapsedDisplay = "+";
  const expandedDisplay = "-";

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (!hasSearchText || includesSearchText) {
    return (
      <div className="student">
        <div className="image">
          <img
            src={props.student.pic}
            alt={`user ${props.student.firstName} ${props.student.lastName}`}
          ></img>
        </div>
        <div className="details">
          <div className="name-expand">
            <div className="fullname">{fullname}</div>
            <div className="expand">
              {!expanded && (
                <button className="plus" onClick={toggleExpanded}>
                  {collapsedDisplay}
                </button>
              )}
              {expanded && (
                <button className="minus" onClick={toggleExpanded}>
                  {expandedDisplay}
                </button>
              )}
            </div>
          </div>
          <div className="gray">
            <div className="email">{`Email: ${props.student.email}`}</div>
            <div className="company">{`Company: ${props.student.company}`}</div>
            <div className="skill">{`Skill: ${props.student.skill}`}</div>
            <div className="average">{`Average: ${average}%`}</div>
            <div className="scores">
              {expanded &&
                props.student.grades.map((score, index) => (
                  <Score
                    key={index}
                    order={index + 1}
                    score={parseInt(score)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Student;
