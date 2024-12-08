import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Notes from './Pages/Notes'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArchivedNotes from './Pages/ArchivedNotes';

function App() {


  const [refresh, setRefresh] = useState(false);
  const refreshData = () => {
    setRefresh(!refresh);
  }


  return (
    <div className='flex'>

      <Navbar refresh={refresh} refreshData={refreshData} />
      <Routes>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/archived-notes" element={<ArchivedNotes />}></Route>
      </Routes>
    </div>
  )
}

export default App
