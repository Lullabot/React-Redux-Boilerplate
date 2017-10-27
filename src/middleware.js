import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, Router } from 'react-router';
import Meta from 'react-helmet';
import reducers from './reducers';
import routes from './routes';

const store = createStore(reducers);

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const head = Meta.rewind();
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
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width">
            </head>
            <body>
              <div id='app'></div>
              <script src='bundle.js'></script>
            </body>
          </html>
        `);
      }
      else if (process.env.NODE_ENV === 'production') {
        const preloadedState = store.getState();
        res.status(200).send(`
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width">
              <link rel='stylesheet' href='bundle.css'>
              ${head.title.toString()}
              ${head.meta.toString()}
              ${head.link.toString()}
            </head>
            <body>
              <div id='app'>${renderToString(
                <Provider store={store}>
                  <Router {...renderProps} />
                </Provider>
              )}
              </div>
              <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
              </script>
              <script src='bundle.js'></script>
            </body>
          </html>
        `);
      }
    }
    else {
      res.status(404).send('Not found');
    }
  });
};
