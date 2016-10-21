import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Posts.css'); // eslint-disable-line global-require
}

const Posts = props => (
  <ul className="post-titles">
    {props.posts.map((post, i) =>
      <li key={i} className="post-title">
        <Link to={`/post-detail/${post.id}`}>{post.title}</Link>
      </li>
    )}
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Posts;
