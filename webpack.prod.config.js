const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = {
  devtool: 'hidden-source-map',
  entry: [
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: ["react", "es2015", "stage-0"]
        }
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader', 
            use: 'css-loader?modules&importLoaders=1&localIdentName=[local]&minimize=1',
            publicPath: '/',
          }) 
      },
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader', 
            use: ['css-loader?modules&importLoaders=1&localIdentName=[local]&minimize=1', 'sass-loader'],
            publicPath: '/',
          }) 
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico|svg)$/,
        exclude: /node_modules/,
        loader:'file-loader?name=[name].[ext]&context=/dist/'
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new ExtractTextPlugin({filename: '[name]-[hash].css', allChunks: true}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      'global': {
        __CLIENT__: true
      }
    }),
    new StatsWriterPlugin({
      filename: "manifest.json"
    }),
    
  ],
}
