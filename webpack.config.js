const webpack = require('webpack')
const path = require('path')

module.exports = {
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
  , path.resolve(__dirname, 'src/entry.js')
  ]
, output: {
    path: __dirname + '/build'
  , publicPath: '/'
  , filename: './bundle.js'
  }
, module: {
    loaders:[
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
, resolve: {
    root: path.resolve(__dirname, 'src')
  }
}
