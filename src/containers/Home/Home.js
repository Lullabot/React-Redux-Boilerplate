import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'react-helmet';
import { fetchPostsIfNeeded } from '../../actions';
import Posts from '../../components/Posts/Posts';
import Header from '../../components/Header/Header';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Home.css'); // eslint-disable-line global-require
}
/*
  Only use classes if you need access to React's lifecycle methods. Stateless functional components
  are preferred when lifecycle methods aren't needed.
 */
export class Home extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  static metatags() {
    return {
      title: 'React Redux Boilerplate',
      link: [
        {
          rel: 'canonical',
          href: 'http://localhost:3000'
        }
      ],
      meta: [
        { name: 'description', content: 'Put some description here!' },
      ]
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchPostsIfNeeded());
  }
  render() {
    const meta = Home.metatags();
    const { posts, isFetching } = this.props;
    const isEmpty = posts.items.length === 0;
    return (
      <div className="page page-home">
        <Meta title={meta.title} link={meta.link} meta={meta.meta} />
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
