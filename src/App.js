import { useState, useEffect } from 'react';
import { Scrollbar } from 'smooth-scrollbar-react';
import dummyData from './data/data';
import './App.css';
import Student from './components/Student';
import SearchByName from './components/SearchByName';

function App() {
  const [students, setStudents] = useState(dummyData);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const dataURL = "https://api.hatchways.io/assessment/students";
    fetch(dataURL)
      .then((response) => response.json())
      .then((json) => {
        setStudents(
          json.students.map((student, index) => ({
            ...student,
            index,
            tags: [],
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const setStudentTag = (student, tag) => {
    if (!student.tags.includes(tag)) {
      student.tags.push(tag);
    }
    const newStudents = [...students];
    newStudents[student.index] = student;
    setStudents(newStudents);
  };

  const mappedStudents = students.map((student) => (
    <Student
      key={student.id}
      student={student}
      searchText={searchText}
      setStudentTag={setStudentTag}
    />
  ));

  return (
    <div className="App">
      <div className="search">
        <SearchByName searchText={searchText} setSearchText={setSearchText} />
      </div>
      <Scrollbar>
        <div className="scroll-container">
          <div className="scroll-inner">
            {mappedStudents}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}

export default App;
