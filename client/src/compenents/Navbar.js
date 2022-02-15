import React from 'react'
import { Link } from 'react-router-dom'
import { LogoutCall } from '../ApiCalls'

const Navbar = ({currUser, setCurrUser}) => {

  const handleLogout=async(e)=>{                //Logging out
    e.preventDefault();
    const res = await LogoutCall();
    if(res.status === 200)
     setCurrUser(null);
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{"background": "linear-gradient(45deg, #bb36fd, #9b00e8)", "zIndex":"2"}}>
  <div className="container-fluid">
  <Link className="navbar-brand" to="/">Navbar</Link>
  <button className="navbar-toggler" style={{"color":"white"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" style={{"color":"white"}}></span>
    </button>  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" style={{"color":"white"}}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/uploadPost" style={{"color":"white"}}>Upload a Post</Link>
        </li>
      </ul>
      <form className="d-flex">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </form>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar