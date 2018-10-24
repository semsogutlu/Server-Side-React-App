# Server Side React (SSR) Boilerplate App
An example of React app w/ server side rendering.

## TLDR; How To Run
- Install [Node](https://nodejs.org/en/download "Node").
- Install [Yarn](https://yarnpkg.com/lang/en/docs/install "Yarn").
- Run "yarn install" on your terminal or on your command prompt.
- Run "yarn run dev".
- Navigate to localhost:3000/people.
- Disable JS and refresh the page to see how it gets rendered initially on the server side.
- Enjoy!
- Note: to build for prod run "yarn run build".

## What The Hell Is SSR
SSR is to handle the initial render when a user first requests our app. 

## Why The Hell Should I Use SSR
Client side react depends on JS execution. So if your browser does not support JS you basically cannot render the page (Sad blank page...). Same thing goes for search engine crawlers. If the crawler cannot execute JS, there is no way crawler will crawl the content of your page. (Even though crawler executes JS, it's tricky to figure out when page is 100% loaded.)

## Why Create From Scratch
One of the biggest reason for this SSR boilerplate app was the existing SSR boilerplate apps have LOTS of dependencies and they are kinda bulky. This is probably most barebone boilerplate of SSR app with [server side routing](https://tylermcginnis.com/react-router-server-rendering/ "React Router") already in place.

## Redux - State Storage For Both Client And Server

In order to use SSR we need to use Redux. In this example we also used Redux-thunk in order to return dispatch function through action callers. (Initially this part sounds super confusing. You can read about [Redux](https://redux.js.org/basics) and [Redux-Thunk](https://alligator.io/redux/redux-thunk)

## Cool. But How Does The App Work
- App creates a fresh Redux Store on every request.
- App dispatches some actions (This part is optional, but it's most like gonna happen).
- App gets the state out of the store and perform SSR.
- App sends the state obtained in the previous step along with the response.

## Server Side
This app uses [Express Middleware](http://expressjs.com/en/guide/using-middleware.html "Express"). Using app.get to fetch the data and app.use to serve static files. (Note that the static files MaxAge is one year. I have explained why below.)

When we initially render (when the page gets rendered on server side) we directly get the data from repository if rendering happens on client side, we make a call to api/fetch. Every time the page is initially rendered we prevent app to hit itself over HTTP.

## Why Caching For So Long
Every time app is get build, webpack deletes all the files inside the build folder generates hashes and appends that hash at the end of the filename and then put the new filenames in the "manifest.json" file (Read more here about [Cache busting](https://webpack.js.org/guides/caching "Cache Busting"):

```javascript
output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  }
new ExtractTextPlugin({filename: '[name]-[hash].css'})  
```

So the first element of "manifest.json" is your name of bundled JS file and second element is your name of your bundled CSS file. Reason we are caching them for long is we do not want to end up in a situation that your actual page is still cached but the cache on CSS or JS file is expired. In that case, browser will try to serve JS and CSS files with old hash and you'll get 404.

## Next Steps
- Implement "[Webpack Hot Loading](https://webpack.js.org/concepts/hot-module-replacement)" for server side (Currently it only works for client side)
