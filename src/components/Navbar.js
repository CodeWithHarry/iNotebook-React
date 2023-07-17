import React, {  useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import NoteContext from '../context/NoteContext'

export default function Navbar() {

  let Location = useLocation()
  let Navigate = useNavigate()
  // const { user } = useContext(NoteContext)

  useEffect(() => {
    // console.log(Location.pathname)
  }, [Location])

  const handleLogout = () => {
    localStorage.removeItem('x-api-key') 
    Navigate('/Login')
  }


  return (
    <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">NoteBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${Location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${Location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('x-api-key') ? <form className="d-flex" role="search">
            {Location.pathname === '/Login' ? <Link className='btn btn-primary mx-2' to="/SignUp">SignUp</Link> :
              <div>
                <Link className='btn btn-primary mx-2' to="/Login">Login</Link>
              </div>
            }
          </form> :
              <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
          }
        </div>
      </div>
    </nav>
  )
}


