import { useState, useEffect } from 'react';
import dummyData from './data/data';
import Student from './components/Student';
import './App.css';

function App() {
  useEffect(() => {
    const dataURL = "https://api.hatchways.io/assessment/students";
    fetch(dataURL)
      .then((response) => response.json())
      .then((json) => { setStudents(json.students) })
      .catch((err) => console.error(err));
  }, []);

  const [students, setStudents] = useState(dummyData);
  return (
    <div className="App" >
      {students.map((student) => <Student key={student.firstName.concat(student.lastName)} student={student} />)}
    </div>
  );
}

export default App;