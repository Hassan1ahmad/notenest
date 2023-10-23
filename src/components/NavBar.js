import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Link,useLocation,useHistory } from 'react-router-dom'

function NavBar() {
  const context = useContext(NoteContext)
  const {resetnotes} = context
  let location = useLocation();
  let history= useHistory()
// close navbar atomatically in small devices
const closeNavbar = () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  // Check if navbarToggler is displayed (indicating we're in a smaller viewport) 
  // and if the navbar is currently expanded
  if (getComputedStyle(navbarToggler).display !== 'none' && !navbarToggler.classList.contains('collapsed')) {
    navbarToggler.click();
  }
  
};


  return (
    
    <nav className="navbar navbar-expand-lg bg-body-secondary">
    <div className="container-fluid">
      <div className='d-flex justify-content-between wid align-items-center'>
      <Link className="navbar-brand"  to="/">NoteNest</Link>
      <div className="userloginbuttonsformobile">
          {!localStorage.getItem('token')?
            <div className="containersignin-up">
            <div>
              <Link to="/login" className={`  ${location.pathname==='/login'? "active": '' }`} > 
              <button className="log buttonsign-up">Login</button>
              </Link>
              <Link to="/signup" className={` ${location.pathname==='/signup'? "active": '' }`} >
              <button className="reg buttonsign-up">Sign up</button>
              </Link>
            </div>
          </div>
          : <button onClick={()=>{localStorage.removeItem('token');history.push('/login')}} className="log buttonsign-up">Log out</button> }
          </div>
      </div>
      <button className={`navbar-toggler ${!localStorage.getItem('token')? 'invisible' : 'visible'}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`navbar-toggler-icon ${!localStorage.getItem('token')? 'invisible' : 'visible'}`}></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li  className={`nav-item ${!localStorage.getItem('token')? 'invisible' : 'visible'}`}>
          <Link onClick={closeNavbar} className={`nav-link ${location.pathname==='/'? "active": '' }`} aria-current="page" to="/">Home</Link>
        </li>
        <li className={`nav-item ${!localStorage.getItem('token')? 'invisible' : 'visible'}`}>
          <Link onClick={closeNavbar} className={`nav-link ${location.pathname==='/notes'? "active": '' }`} to="/notes">Notes</Link>
        </li>
        </ul>
      
          {/* Sign in and up Buttons */}
          <div className="userloginbuttonsfordesktop">
          {!localStorage.getItem('token')?
            <div className="containersignin-up">
            <div>
              <Link to="/login" className={`  ${location.pathname==='/login'? "active": '' }`} > 
              <button className="log buttonsign-up">Login</button>
              </Link>
              <Link to="/signup" className={` ${location.pathname==='/signup'? "active": '' }`} >
              <button className="reg buttonsign-up">Sign up</button>
              </Link>
            </div>
          </div>
          : <button onClick={()=>{localStorage.removeItem('token');history.push('/login');resetnotes()}} className="log buttonsign-up">Log out</button> }
          </div>
      </div>
    </div>
  </nav>
  )
}

export default NavBar
