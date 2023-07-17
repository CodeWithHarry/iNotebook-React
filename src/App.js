import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/NoteState'
import Alert from '../src/components/Alert'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { useState } from 'react'

function App() {

  const [alert, setAlert] = useState(null)


  const alertFunction = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <Router>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={alertFunction} />} />
            <Route path="/about" element={<About showAlert={alertFunction} />} />
            <Route path="/login" element={<Login showAlert={alertFunction} />} />
            <Route path="/signUp" element={<SignUp showAlert={alertFunction} />} />

          </Routes>
        </div>
      </NoteState>
    </Router>
  );
}

export default App;
