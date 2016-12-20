import React, { Component, PropTypes } from 'react'
import VideoList from './VideoList'
import ScrollMonitor from './ScrollMonitor'
import configureStore from '../mods/configureStore.js'
import { Provider } from 'react-redux'
import rootReducer from '../states/index'

const store = configureStore()

let styles = {
  wrapper: {
    backgroundColor: '#0e2439',
    minHeight: '100vh',
  },
  content: {
    width: 600,
    margin: '0 auto',
  },
  header: {
    padding: 30,
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
  }
}

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <ScrollMonitor>
          <div style={ styles.wrapper }>
            <div style={ styles.content }>
              <h1 style={ styles.header }>
                Steam 当前促销游戏
              </h1>
              <VideoList />
            </div>
          </div>
        </ScrollMonitor>
      </Provider>
    )
  }
}
