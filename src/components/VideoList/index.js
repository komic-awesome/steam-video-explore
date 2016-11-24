import React, { Component, PropTypes } from 'react'
import VideoListState from '../../states/VideoList'
import { connect } from 'react-redux'
import { Actions } from 'jumpstate'

import VideoItem from 'components/VideoItem'

class View extends Component {
  componentWillMount() {
    Actions.fetchVideoList()
  }

  render() {
    if (!this.props.list.length) {
      return <div>加载中...</div>
    }
    return (
      <div>
        { this.props.list.map((item, index) => {
            return <VideoItem key={index} appid={item.get('appid')} />
          })
        }
      </div>
    )
  }
}

export default connect(state => {
  return {
    list: state.videoList ? state.videoList.collection : []
  }
})(View)
