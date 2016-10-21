import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions';

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
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
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  posts,
  routing: routerReducer
});

export default rootReducer;
