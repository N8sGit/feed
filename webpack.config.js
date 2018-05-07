const LiveReloadPlugin = require('webpack-livereload-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',

  module: {

    resolve: {
      extensions: ['', '.css', '.js', '.jsx']
    },

    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
       test: /\.css$/,
       include: /node_modules/,
       loader: 'style-loader!css-loader',
       use: ['style-loader', 'css-loader'],
      }
    ]
  },
  // When we're in development, we can use this handy live-reload plugin
  // to refresh the page for us every time we make a change to our client-side
  // files. It's like `nodemon` for the front end!
  plugins: isDev ? [new LiveReloadPlugin({appendScriptTag: true}),  new webpack.ProvidePlugin({
    'window.hljs': 'highlight.js'
  })] : [ new webpack.ProvidePlugin({
    'window.hljs': 'highlight.js'
  })]
}
