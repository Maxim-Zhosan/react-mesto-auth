import React from 'react';
import logo from '../images/header-logo.svg';
import '../index.css';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
    </header>
  );
}

export default Header;