import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../../actions';
import Posts from '../../components/Posts/Posts';
import Header from '../../components/Header/Header';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Home.css'); // eslint-disable-line global-require
}

export class Home extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }
  render() {
    const { posts, isFetching } = this.props;
    const isEmpty = posts.items.length === 0;
    return (
      <div className="page page-home">
        <Header />
        <h3>Latest Posts</h3>
        {isEmpty
          ? (isFetching ? <h3>Loading...</h3> : <h4 className="home__message">Empty :(</h4>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts.items} />
          </div>
        }
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

export default connect(mapStateToProps)(Home);
