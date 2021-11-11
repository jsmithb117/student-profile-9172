const Student = (props) => {
  const gradesInts = props.student.grades.map((grade) => parseInt(grade));
  const average = gradesInts.reduce((a, b) => a + b) / gradesInts.length;
  const fullname =
    `${props.student.firstName} ${props.student.lastName}`.toUpperCase();

  return (
    <div className="student">
      <div>
        <img
          className="image"
          src={props.student.pic}
          alt={`user ${props.student.firstName} ${props.student.lastName}`}
        ></img>
      </div>
      <div className="details">
        <div className="fullname">{fullname}</div>
        <div className="gray">
          <div className="email">{`Email: ${props.student.email}`}</div>
          <div className="company">{`Company: ${props.student.company}`}</div>
          <div className="skill">{`Skill: ${props.student.skill}`}</div>
          <div className="average">{`Average: ${average}%`}</div>
        </div>
      </div>
    </div>
  );
};

export default Student;
