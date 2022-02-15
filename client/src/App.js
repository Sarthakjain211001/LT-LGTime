import './App.css';
import React, {useState} from 'react'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home';
import UploadPost from './pages/UploadPost/UploadPost';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

const App = () => {
  
  const [currUser, setCurrUser] = useState(null);

  return (
    <Router>
      <Routes>         {/*If curr user is present then the respective page will be shown else user will be navigated to the login page */}
      <Route exact path = "/" element = {currUser ? <Home currUser={currUser} setCurrUser={setCurrUser}/> : <Navigate replace to="/login"/>}></Route>
      <Route exact path = "/login" element = {currUser ? <Navigate replace to="/"/> : <Login currUser={currUser} setCurrUser={setCurrUser}/>}></Route>
      <Route exact path = "/signup" element = {currUser ? <Navigate replace to="/"/> : <Signup currUser={currUser} setCurrUser={setCurrUser}/>}></Route>
      <Route exact path = "/uploadPost" element = {currUser ? <UploadPost/> : <Navigate replace to="/login"/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
