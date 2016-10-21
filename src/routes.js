import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './containers/Home/Home';
import PostDetail from './containers/PostDetail/PostDetail';

console;

export default (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="/post-detail/:postID" component={PostDetail} />
  </Route>
);
