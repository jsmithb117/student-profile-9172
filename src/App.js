import { useState, useEffect } from 'react';
import { Scrollbar } from 'smooth-scrollbar-react';
import dummyData from './data/data';
import './App.css';
import Student from './components/Student';
import Search from './components/Search';

function App() {
  const [students, setStudents] = useState(dummyData);
  const [searchNameText, setSearchNameText] = useState('');

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
      searchNameText={searchNameText}
      setStudentTag={setStudentTag}
    />
  ));

  return (
    <div className="App">
      <div className="search">
        <Search
          class="search-by-name"
          placeHolder="Search by name"
          searchText={searchNameText}
          setSearchText={setSearchNameText}
        />
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
