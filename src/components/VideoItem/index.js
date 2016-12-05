import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { includes } from 'lodash'
import Video from './Video'
import Radium from 'radium'

var styles = {
  videoWrapper: {
    height: 270,
  },
  videoItem: {
    height: 340,
    padding: '0',
    padding: '30px 0px 0px',
    textAlign: 'center',
    backgroundColor: '#1f364d',
    marginBottom: 40,
  },
  videoTitle: {
    height: 50,
    display: 'block',
    color: '#b9c9da',
    backgroundColor: '#193048',
    marginTop: '20px',
    lineHeight: '50px',
    fontSize: '13px',
    textDecoration: 'none',
  }
}

@Radium
class View extends Component {

  constructor(props) {
    super(props)
    this.state = {
      play: true
    }
  }


  handleTimeUpdate(currentTime) {
    // TODO(yangqing): save currentTime
  }

  render() {
    let item = this.props.item
      , content = item.get('content')
      , movie = content.movies[0]
      , gameName = content.name
      , gameUrl = `https://steamcommunity.com/app/${item.get('appid')}`

    let video = (
      <Video
        ref="video"
        onTimeUpdate={ this.handleTimeUpdate.bind(this) }
        playOrPause={ this.props.autoplay }
        poster={ movie.thumbnail }
        >
        <source src={ movie.webm['480'] } type="video/webm" />
      </Video>
    )


    return (
      <div style={ styles.videoItem }>
        <div style={ styles.videoWrapper }>
          { this.props.shouldBeRender && video }
        </div>
        <a href={ gameUrl } target="_blank" style={ styles.videoTitle }>
          { gameName }
        </a>
      </div>
    )
  }
}

export default connect((state, ownProps) => {
  let { scrollMonitor, videoList } = state
  let list = videoList.collection
  let item = list.find(item => item.get('appid') === ownProps.appid)
  let shouldBeRender =
    includes(scrollMonitor.appidsShouldBeRender, item.get('appid'))

  return {
    item: list.find(item => item.get('appid') === ownProps.appid),
    autoplay: scrollMonitor.appidShouldBePlay === ownProps.appid,
    shouldBeRender,
  }
})(View)
