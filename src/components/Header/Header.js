import React from 'react';
import { Link } from 'react-router';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Header.css'); // eslint-disable-line global-require
}

const Header = () => (
  <div className="Header">
    <h1 className="Header-title">React Redux Boilerplate</h1>
    <ul className="Header-menu">
      <Link to="/">Home</Link>
    </ul>
  </div>
);

export default Header;
