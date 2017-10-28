import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'react-helmet';
import { fetchPostsIfNeeded } from '../../actions';
import Posts from '../Posts/Posts';
import Header from '../Header/Header';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./HomePage.css'); // eslint-disable-line global-require
}

export class HomePage extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object.isRequired)
  }
  static getMeta() {
    return {
      title: 'React Redux Boilerplate',
      link: [
        {
          rel: 'canonical',
          href: 'http://localhost:3000'
        }
      ],
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'description', content: 'Put the home page description here!'
        }
      ]
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }
  render() {
    const { posts, isFetching } = this.props;
    const isEmpty = posts.length === 0;
    const head = HomePage.getMeta();
    return (
      <div className="HomePage">
        <Meta
          title={head.title}
          description={head.description}
          link={head.link}
          meta={head.meta}
        />
        <Header />
        <h3>Latest Posts</h3>
        {isEmpty
          ? (isFetching ? <h3>Loading...</h3> : <h4 className="HomePage-message">Empty :(</h4>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
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

export default connect(mapStateToProps)(HomePage);
