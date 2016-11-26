'use strict'
const path = require('path')
const webpack = require('webpack')
const root = path.resolve(__dirname, '../')

module.exports = function(environment) {
  let commonConfigs = {
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
  }

  let configs = commonConfigs

  if (environment === 'production') {
    configs = Object.assign(configs, {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })
      ]
    })
  } else {
    configs = Object.assign(configs, {
      devServer: {
        historyApiFallback: true
      , hot: true
      , inline: true
      , progress: true
      , contentBase: './src'
      , port: 8080
      }
    , entry: [
        'webpack/hot/dev-server'
      , 'webpack-dev-server/client?http://localhost:8080'
      , path.resolve(root, 'src/entry.js')
      ]
    })
  }

  return configs
};
