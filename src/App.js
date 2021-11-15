import { useState, useEffect, useMemo } from 'react';
import { Scrollbar } from 'smooth-scrollbar-react';
import dummyData from './data/data';
import './App.css';
import Student from './components/Student';
import Search from './components/Search';

function App(props) {
  const [students, setStudents] = useState(dummyData);
  const [searchName, setSearchName] = useState(null);
  const [searchTag, setSearchTag] = useState(null);
  const controller = useMemo(() => (new AbortController()), []);
  const { signal } = controller;

  useEffect(() => {
    fetch(props.url, { signal })
      .then((response) => response.json())
      .then((json) => {
        setStudents(
          json.students.map((student, index) => {
            const fullname = student.firstName.concat(' ', student.lastName).toUpperCase();
            return {
            ...student,
            index,
            tags: [],
            fullname,
          }
        })
        );
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      });
    return () => {
      controller.abort();
    }
  }, [ props.url, signal, controller ]);


  const setStudentTag = (student, tag) => {
    if (!student.tags.includes(tag)) {
      student.tags.push(tag);
    }
    const newStudents = [...students];
    newStudents[student.index] = student;
    setStudents(newStudents);
  };

  const filteredStudents = students.filter((student) => {
    const passesNameSearch = searchName && student.fullname.includes(searchName.toUpperCase());
    const tagsThatPass = student.tags.filter((tag) => tag.includes(searchTag));
    const passesTagSearch = searchTag && tagsThatPass.length > 0; //tag search is case sensitive

    if (!searchName && !searchTag) {
      return true;
    }
    if (searchName && !searchTag) {
      return passesNameSearch;
    }
    if (!searchName && searchTag) {
      return passesTagSearch;
    }
    if (searchName &&  searchTag) {
      return passesNameSearch && passesTagSearch;
    }
    return false;
  })

  const mappedStudents = filteredStudents.map((student) => (
    <Student
      key={student.id}
      student={student}
      searchName={searchName}
      searchTag={searchTag}
      setStudentTag={setStudentTag}
    />
  ));

  return (
    <div className="App">
      <div className="search">
        <Search
          class="search-by-name"
          placeHolder="Search by name"
          searchText={searchName}
          setSearchText={setSearchName}
        />
        <Search
          class="search-by-tag"
          placeHolder="Search by tag"
          searchText={searchTag}
          setSearchText={setSearchTag}
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
