import { useState, useEffect, useRef } from 'react';
import dummyData from './data/data';
import Student from './components/Student';
import './App.css';

import { Scrollbar } from 'smooth-scrollbar-react';

function App() {
  const scrollbar = useRef(null);
  const [students, setStudents] = useState(dummyData);

  useEffect(() => {
    const dataURL = "https://api.hatchways.io/assessment/students";
    fetch(dataURL)
      .then((response) => response.json())
      .then((json) => { setStudents(json.students) })
      .catch((err) => console.error(err));
  });

  return (
    <div className="App">
      <Scrollbar ref={scrollbar} >
        <div className="scroll-container">
          <div className="scroll-inner" >
            {students.map((student) => <Student key={student.firstName.concat(student.lastName)} student={student} />)}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}

export default App;