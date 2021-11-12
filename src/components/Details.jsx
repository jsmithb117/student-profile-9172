import { useState } from "react";
import Score from "./Score";
import Tags from "./Tags";
import Name from './Name';
import Email from './Email';
import Company from './Company';

const Details = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const gradesInts = props.grades.map((grade) => parseInt(grade));
  const average = gradesInts.reduce((a, b) => a + b) / gradesInts.length;

  return (
    <div className="details">
      <Name fullname={props.fullName}setExpanded={setExpanded} expanded={expanded} />
      <div className="info">
        <Email email={props.student.email} />
        <Company company={props.student.company} />
        <div className="skill">{`Skill: ${props.student.skill}`}</div>
        <div className="average">{`Average: ${average}%`}</div>
        <div className="scores">
          {expanded &&
            props.student.grades.map((score, index) => (
              <Score key={index} order={index + 1} score={parseInt(score)} />
            ))}
        </div>
        <Tags student={props.student} setStudentTag={props.setStudentTag} />
      </div>
    </div>
  );
};

export default Details;
