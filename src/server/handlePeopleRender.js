import { getPeople } from './repository'
import configureStore from '../common/store/configureStore'
import ReactDOMServer  from 'react-dom/server'
import React from 'react'
import { renderFullPage } from './renderFullPage'
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux'
import App from '../common/containers/App'

export const handlePeopleRender = (req, res, next) => {
    getPeople(people => {
      if(!people)
      {
        res.status(404).redirect("/notfound")
        return 
      }
      const preloadedState = {people};
      const store = configureStore(preloadedState);
      // Grab the initial state from our Redux store
      const finalState = store.getState()
      // Send the rendered page back to the client
      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={{ pathname: req.url }} context={ {} }>
            <div>
              <App/>
            </div>
          </StaticRouter>
        </Provider>
      )
      res.status(200).send(renderFullPage(html, finalState))  
    })
  }