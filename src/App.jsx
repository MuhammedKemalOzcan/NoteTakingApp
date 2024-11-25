import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Notes from './Pages/Notes'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const [chooseTags, setChooseTags] = useState([]);


  return (
    <div className='flex'>

      <Navbar />
      <Routes>
        <Route path="/notes" element={<Notes />}></Route>
      </Routes>
    </div>
  )
}

export default App
