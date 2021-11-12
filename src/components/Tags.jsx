import { useState } from 'react';
import Tag from './Tag';

const Tags = (props) => {
  const [tagDisplay, setTagDisplay] = useState("");
  const addTag = (event) => {
    event.preventDefault();
    props.setStudentTag(props.student, tagDisplay);
    setTagDisplay('');
  };

  return (
    <div className="tags">
    {props.student.tags.map((tag) => (
      <Tag key={tag} tag={tag} addTag={addTag} />
    ))}
    <div className="addtag">
      <form onSubmit={(e) => addTag(e)}>
        <input
          type="text"
          value={tagDisplay}
          placeholder={"Add a tag"}
          onChange={(e) => {
            setTagDisplay(e.target.value);
          }}
        ></input>
      </form>
    </div>
  </div>
  )
};

export default Tags