import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';
import { find } from 'lodash';
import Header from '../Header/Header';
import { fetchPostsIfNeeded } from '../../actions';
// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./PostPage.css'); // eslint-disable-line global-require
}

export class PostPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  static getMeta(id) {
    return {
      title: `Post Detail Page - Post ${id}`,
      link: [
        {
          rel: 'canonical',
          href: `http://localhost:3000/post/${id}`
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
  }
  static getPost(props) {
    const postID = parseInt(props.params.postID) || 0;
    return find(props.posts, { id: postID }) || {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }
  render() {
    const post = PostPage.getPost(this.props);
    const head = PostPage.getMeta(post.id);
    return (
      <div className="PostPage">
        <Meta
          title={head.title}
          description={head.description}
          link={head.link}
          meta={head.meta}
        />
        <Header />
        <h1 className="PostPage-title">{post.title}</h1>
        <p>{post.body}</p>
        <Link to="/">Return home</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { posts = [], isFetching = false, lastUpdated } = state;
  return {
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(PostPage);
