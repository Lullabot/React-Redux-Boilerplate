import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';
import find from 'lodash/find';
import Header from '../../components/Header/Header';
// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./PostDetail.css'); // eslint-disable-line global-require
}

export const PostDetail = (props) => {
  const postID = parseInt(props.params.postID);
  const head = {
    title: 'Post Detail Page',
    link: [
      {
        rel: 'canonical',
        href: `http://localhost:3000/post-detail/${postID}`
      }
    ],
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'description', content: 'Put the description here!'
      }
    ]
  };
  const post = find(props.posts.items, { id: postID });
  return (
    <div className="page page-post">
      <Meta
        title={head.title}
        description={head.description}
        link={head.link}
        meta={head.meta}
      />
      <Header />
      <h1 className="page-post__post-title">{post.title}</h1>
      <p>{post.body}</p>
      <Link to="/">Return home</Link>
    </div>
  );
};

PostDetail.propTypes = {
  posts: PropTypes.object.isRequired,
  params: PropTypes.shape({
    postID: PropTypes.string.isRequired
  })
};

const mapStateToProps = (state) => {
  const { posts } = state;
  const {
    isFetching,
    lastUpdated
  } = posts || {
    isFetching: true,
    items: []
  };

  return {
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(PostDetail);
