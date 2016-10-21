import React from 'react';
import { Link } from 'react-router';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Header.css'); // eslint-disable-line global-require
}

const Header = () => (
  <div className="header">
    <h1 className="title">React Redux Boilerplate</h1>
    <ul className="menu">
      <Link to="/">Home</Link>
    </ul>
  </div>
);

export default Header;
