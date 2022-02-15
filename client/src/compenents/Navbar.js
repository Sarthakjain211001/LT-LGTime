import React from 'react'
import { Link } from 'react-router-dom'
import { LogoutCall } from '../ApiCalls'

const Navbar = ({currUser, setCurrUser}) => {

  const handleLogout=async()=>{                //Logging out
    const res = await LogoutCall();
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{"background": "linear-gradient(45deg, #bb36fd, #9b00e8)", "z-index":"2"}}>
  <div className="container-fluid">
  <Link class="navbar-brand" to="/">Navbar</Link>
  <button class="navbar-toggler" style={{"color":"white"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" style={{"color":"white"}}></span>
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