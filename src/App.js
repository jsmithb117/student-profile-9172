import { useState, useEffect, useRef } from 'react';
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
      .then((json) => { setStudents(json.students) })
      .catch((err) => console.error(err));
  });

  return (
    <div className="App">
      <div className="search">
        <SearchByName searchText={searchText} setSearchText={setSearchText} />
      </div>
      <Scrollbar >
        <div className="scroll-container">
          <div className="scroll-inner" >
            {students.map((student) => <Student key={student.firstName.concat(student.lastName)} student={student} searchText={searchText} />)}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}

export default App;