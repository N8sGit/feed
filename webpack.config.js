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
 
  plugins: isDev ? [ new webpack.ProvidePlugin({
    'window.hljs': 'highlight.js'
  })] : [ new webpack.ProvidePlugin({
    'window.hljs': 'highlight.js'
  })]
}
