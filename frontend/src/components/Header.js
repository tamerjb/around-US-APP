import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../images/around.svg';

const Header = ({ loggedIn, email, handleSignout }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/signin';
  const isRegister = location.pathname === '/signup';

  return (
    <header className='header'>
      <div className='header__container'>
        <img src={logo} alt='Around the US Logo' className='header__logo' />

        <nav className='header_navbar'>
          <ul
            className={`header__links ${
              isLogin || isRegister ? 'header__links_signup-login-page' : ''
            }`}
          >
            {isLogin && (
              <li className='header__link-item'>
                <Link to='/signup' className='header__link'>
                  Sign up
                </Link>
              </li>
            )}
            {isRegister && (
              <li className='header__link-item'>
                <Link to='/signin' className='header__link'>
                  Log in
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className='header__link-item'>
                <Link
                  to='/signin'
                  className='header__link'
                  onClick={handleSignout}
                >
                  Log out
                </Link>
              </li>
            )}
            {loggedIn && <li className='header__link-item'>{email}</li>}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
