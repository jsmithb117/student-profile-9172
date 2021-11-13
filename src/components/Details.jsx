import { useState } from "react";
import Score from "./Score";
import Tags from "./Tags";
import Name from './Name';
import Detail from './Detail';

const Details = (props) => {
  const [expanded, setExpanded] = useState(false);

  const gradesInts = props.grades.map((grade) => parseInt(grade));
  const average = gradesInts.reduce((a, b) => a + b) / gradesInts.length;

  return (
    <div className="details">
      <Name fullname={props.student.fullname} setExpanded={setExpanded} expanded={expanded} />
      <div className="info">
        <Detail class='email' title='Email' value={props.student.email} />
        <Detail class='company' title='Company' value={props.student.company} />
        <Detail class='skill' title='Skill' value={props.student.skill} />
        <Detail class='average' title='Average' value={`${average}%`} />
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
