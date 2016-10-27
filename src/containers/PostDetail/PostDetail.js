import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';
import { find } from 'lodash';
import Header from '../../components/Header/Header';
import { fetchPostsIfNeeded } from '../../actions';
// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./PostDetail.css'); // eslint-disable-line global-require
}

export class PostDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  static getMeta(id) {
    return {
      title: `Post Detail Page - Post ${id}`,
      link: [
        {
          rel: 'canonical',
          href: `http://localhost:3000/post-detail/${id}`
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
    return find(props.posts.items, { id: postID }) || {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }
  render() {
    const post = PostDetail.getPost(this.props);
    const head = PostDetail.getMeta(post.id);
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
  }
}

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
