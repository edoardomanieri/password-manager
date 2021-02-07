import React, { useState } from "react";
import { useScrollYPosition } from "react-use-scroll-position";
import { NavLink } from "react-router-dom"
import '../../static/css/Navbar.css';

function Navbar({ isLoggedIn, setLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollYPosition();

  const stickeyTrigger = window.innerHeight / 2.75;

  function handle_logout() {
    localStorage.removeItem('token');
    setLogin();
  };

  return (
    <div
      className={`nav${scrollY > stickeyTrigger ? " nav-stickey" : ""}${
        menuOpen ? " nav-open" : ""
      }`}>
      <div className="nav-content">
        <div className="nav-logo">PasswordManager</div>

        <nav className="nav-links__container">
        <div className="nav-link__text">
        <NavLink to="/" exact>Home</NavLink>
        </div>
        {isLoggedIn ? null :
        <div className="nav-link__text">
        <NavLink to="/login" exact>Login</NavLink>
        </div>
        }
        {isLoggedIn ? null :
        <div className="nav-link__text">
        <NavLink to="/signup" exact>Signup</NavLink>
        </div>
        }
        {!isLoggedIn ? null :
        <div className="nav-link__text">
        <NavLink to="/" onClick={handle_logout} exact>Logout</NavLink>
        </div>
        }
        {!isLoggedIn ? null :
        <div className="nav-link__text">
        <NavLink to="/list" exact>Passwords</NavLink>
        </div>
        }
        {!isLoggedIn ? null :
        <div className="nav-link__text">
        <NavLink to="/create" exact>Add new password</NavLink>
        </div>
        }
        </nav>
        <div className="nav-menu__icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}
  
  export default Navbar;
  