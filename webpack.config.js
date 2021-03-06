const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  mode: 'development',
  plugins: [
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
} 