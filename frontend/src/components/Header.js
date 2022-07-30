import React from 'react';
import logo from '../images/header-assets/logo.svg'
import {  NavLink, useLocation } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Header(props) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  return( 

    <header className="header"> 
      <img className="header__logo" src={logo} alt="Around the U.S. Logo" /> 
      <div className="header__nav"> 
        {props.isLoggedIn && pathname === "/" ? <p>{currentUser.data && currentUser.data.email}</p> : ''} 
        {(props.isLoggedIn && pathname === "/") ? ( 
          <button onClick={props.logout} className="header__link">Log out</button>)  
          : (pathname === '/signin' ?  
            <NavLink to="/signup" className="header__link">Sign up</NavLink>  
          : <NavLink to="/signin" className="header__link">Log in</NavLink>)} 
      </div> 
    </header> 

  ) 
}

export default Header;