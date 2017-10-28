import React from 'react';
import PropTypes from 'prop-types';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./App.css'); // eslint-disable-line global-require
}

const App = props => (
  <div className="App">
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node
};

export default App;
