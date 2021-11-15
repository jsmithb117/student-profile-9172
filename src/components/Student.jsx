import Details from "./Details";

const Student = (props) => (
  <div className="student">
    <div className="image">
      <img
        src={props.student.pic}
        alt={`user ${props.student.firstName} ${props.student.lastName}`}
      ></img>
    </div>
    <Details
      student={props.student}
      setStudentTag={props.setStudentTag}
      grades={props.student.grades}
    />
  </div>
);

export default Student;
