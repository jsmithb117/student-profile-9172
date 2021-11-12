import Details from "./Details";

const Student = (props) => {
  const fullname =
    `${props.student.firstName} ${props.student.lastName}`.toUpperCase();
  const includesSearchNameText = fullname.includes(props.searchNameText.toUpperCase());
  const hasSearchNameText = props.searchNameText.length === 0 ? false : true;

  if (!hasSearchNameText || includesSearchNameText) {
    return (
      <div className="student">
        <div className="image">
          <img
            src={props.student.pic}
            alt={`user ${props.student.firstName} ${props.student.lastName}`}
          ></img>
        </div>
        <Details student={props.student} setStudentTag={props.setStudentTag} fullName={fullname} grades={props.student.grades} />
      </div>
    );
  } else {
    return null;
  }
};

export default Student;
