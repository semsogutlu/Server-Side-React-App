import configureStore from '../common/store/configureStore'
import ReactDOMServer  from 'react-dom/server'
import React from 'react'
import { renderFullPage } from './renderFullPage'
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux'
import App from '../common/containers/App'

export const handleRender = (req, res, next) => {
    // Create a new Redux store instance
    const store = configureStore();
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={{ pathname: req.url }} context={ {} }>
          <App/>
        </StaticRouter>
      </Provider>
    )
    const finalState = store.getState()
    res.status(200).send(renderFullPage(html, finalState))
  }