import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (
    <header className='header d-flex'>
      <h1 className='header__logo'>
        <Link className='header__logo-link' to='/'>StarDB</Link>
      </h1>
      
      <nav className='header__nav'>
        <ul className='header__menu-list d-flex'>
          <li className='header__menu-item'>
            <Link className='header__menu-link' to='/people/'>Persons</Link>
          </li>
          <li className='header__menu-item'>
            <Link className='header__menu-link' to='/planets/'>Planets</Link>
          </li>
          <li className='header__menu-item'>
            <Link className='header__menu-link' to='/starships/'>Starships</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;