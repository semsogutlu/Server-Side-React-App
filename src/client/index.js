import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { BrowserRouter } from 'react-router-dom'
import './static/favicon.ico'
import './index.css'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <App/>
      </div>
    </BrowserRouter>
  </Provider>,
  rootElement
)
