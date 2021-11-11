import { useState, useEffect, useRef } from 'react';
import dummyData from './data/data';
import Student from './components/Student';
import './App.css';

import { Scrollbar } from 'smooth-scrollbar-react';

function App() {
  const scrollbar = useRef(null);

  useEffect(() => {
    const dataURL = "https://api.hatchways.io/assessment/students";
    fetch(dataURL)
      .then((response) => response.json())
      .then((json) => { setStudents(json.students) })
      .catch((err) => console.error(err));
  });

  const [students, setStudents] = useState(dummyData);
  return (
    <div className="scroll-outer">

      <Scrollbar
        ref={scrollbar}
        alwaysShowTracks={false}
        thumbMinSize={0}
      >
        <div className="scroll-container">
          <div className="App" >
            {students.map((student) => <Student key={student.firstName.concat(student.lastName)} student={student} />)}
          </div>
        </div>
      </Scrollbar>
    </div>

  );
}

export default App;