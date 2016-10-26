import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, Router } from 'react-router';
import Meta from 'react-helmet';
import reducers from './reducers';
import routes from './routes';
import api from './lib/api';
import { receivePosts } from './actions';

const store = createStore(reducers);

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      if (process.env.NODE_ENV === 'development') {
        res.status(200).send(`
          <html>
            <body>
              <div id='app'></div>
              <script src='bundle.js'></script>
            </body>
          </html>
        `);
      }
      else if (process.env.NODE_ENV === 'production') {
        api('https://jsonplaceholder.typicode.com/posts')
          .then(
            json => store.dispatch(receivePosts(json)),
          )
          .then(() => {
            const preloadedState = store.getState();
            const html = renderToString(
              <Provider store={store}>
                <Router {...renderProps} />
              </Provider>
            );
            const head = Meta.rewind();
            res.status(200).send(`
              <html>
                <head>
                  ${head.title.toString()}
                  ${head.meta.toString()}
                  ${head.link.toString()}
                  <link rel='stylesheet' href='bundle.css'>
                </head>
                <body>
                  <div id='app'>${html}
                  </div>
                  <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
                  </script>
                  <script src='bundle.js'></script>
                </body>
              </html>
            `);
            return;
          });
      }
    }
    else {
      res.status(404).send('Not found');
    }
  });
};
