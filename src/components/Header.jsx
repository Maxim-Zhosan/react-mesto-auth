import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({headerLink}) {
  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      <Link to={headerLink.link} className="header__link">{headerLink.name}</Link>
      
    </header>
    
  );
}

export default Header;