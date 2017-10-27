import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Posts.css'); // eslint-disable-line global-require
}

const Posts = props => (
  <ul className="Posts">
    {props.posts.map((post, i) =>
      <li key={i} className="Posts-post">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    )}
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Posts;
