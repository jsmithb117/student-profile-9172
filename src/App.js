import { useState, useEffect } from 'react';
import dummyData from './data/data';
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

    </div>
  );
}

export default App;