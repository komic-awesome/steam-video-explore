import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { includes } from 'lodash'
import Video from './Video'

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
    let content = item.get('content')
    let movie = content.movies[0]

    let containerStyle = {
      height: 240,
      borderTop: '1px solid #ddd',
      padding: '20px 10px',
      textAlign: 'center',
    }

    let video = (
      <Video
        ref="video"
        onTimeUpdate={ this.handleTimeUpdate.bind(this) }
        playOrPause={ this.props.autoplay }
        >
        <source src={ movie.webm['480'] } type="video/webm" />
      </Video>
    )

    return (
      <div style={ containerStyle }>
        { this.props.shouldBeRender && video }
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
