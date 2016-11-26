'use strict'

module.exports = require('./createWebpackConfig')('development')
const path = require('path')
const webpack = require('webpack');

const root = path.resolve(__dirname, '../')

module.exports = {
  entry: [
    path.resolve(root, 'src/entry.js')
  ]
, output: {
    path: root + '/build'
  , publicPath: '/'
  , filename: './bundle.js'
  }
, module: {
    loaders:[
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
, resolve: {
    root: path.resolve(root, 'src')
  }
, plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
}
