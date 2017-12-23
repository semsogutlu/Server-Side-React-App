const tryRequire = require('try-require');

export const renderFullPage = (html, preloadedState) => {
    
    let js = "main.js"
    let css = ""
   
    if(process.env.NODE_ENV === "production")
    {
        const manifest = tryRequire('../../dist/manifest.json');
        js = manifest.assetsByChunkName.main[0];
        css = `<link rel="stylesheet" href="/${manifest.assetsByChunkName.main[1]}">`;
    }
  
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <link rel="shortcut icon" href="/favicon.ico">
          ${css}
          <title>Server Side React App</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script>
           window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
          </script>
          <script src="/${js}"></script>
        </body>
      </html>
      `
  }
