import {
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions';

export default (state = {
  isFetching: false,
  didInvalidate: false,
  posts: []
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        posts: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
};
