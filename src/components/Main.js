import React, { Component, PropTypes } from 'react'
import VideoList from './VideoList'
import ScrollMonitor from './ScrollMonitor'
import configureStore from '../mods/configureStore.js'
import { Provider } from 'react-redux'
import rootReducer from '../states/index'

const store = configureStore()

const containerStyle = {
  width: 600
, margin: '0 auto'
}

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <ScrollMonitor>
          <div style={containerStyle}>
            <h1>看视频找游戏</h1>
            <VideoList />
          </div>
        </ScrollMonitor>
      </Provider>
    )
  }
}
