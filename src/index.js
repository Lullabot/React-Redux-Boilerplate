import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import routes from './routes';

// This allows us to use Redux dev tools.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// With server rendering, we can grab the preloaded state.
const preloadedState = window.__PRELOADED_STATE__ || {}; // eslint-disable-line

const store = createStore(
  reducers,
  preloadedState,
  composeEnhancers(applyMiddleware(...middleware))
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('app') // eslint-disable-line no-undef
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default); // eslint-disable-line global-require
  });
}
