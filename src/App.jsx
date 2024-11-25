import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Notes from './Pages/Notes'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const [chooseTags, setChooseTags] = useState([]);

  const sendTags = (tags) => {
    setChooseTags(tags);
  }

  return (
    <div className='flex'>

      <Navbar sendTags={sendTags} />
      <Routes>
        <Route path="/notes" element={<Notes chooseTags={chooseTags} />}></Route>
      </Routes>
    </div>
  )
}

export default App
