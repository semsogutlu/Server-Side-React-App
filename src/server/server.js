/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { getPeople } from './repository'
import webpackConfig from '../../webpack.dev.config'
import { handlePeopleRender } from './handlePeopleRender'
import { handleRender } from './handleRender'

const app = new Express();
const port = process.env.PORT;

if(process.env.NODE_ENV !== 'production'){
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}
app.use(Express.static(path.resolve(__dirname, '../../dist/'), {maxAge: "365d"}));
app.get('/api/people/', function (req, res, next) {
  getPeople(apiResult => {
    res.send(apiResult)
    return;
  });
});

app.get('/people', handlePeopleRender)
app.all('/*', handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
