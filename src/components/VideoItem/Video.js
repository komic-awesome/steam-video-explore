import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class View extends Component {

  handleTimeUpdate(event) {
    this.hasRendered = false
    let { onTimeUpdate } = this.props
    if (!onTimeUpdate) { return }

    onTimeUpdate(this.element.currentTime)
  }

  componentDidMount() {
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
    this.element = ReactDOM.findDOMNode(this)
    this.element.addEventListener("timeupdate", this.handleTimeUpdate)
  }

  componentWillUnmount() {
    this.element.removeEventListener("timeupdate", this.handleTimeUpdate)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.element[nextProps.playOrPause ? 'play': 'pause']()
  }

  render() {
    let hasRendered = this.hasRendered
    let autoplay = !hasRendered && this.props.playOrPause
    this.hasRendered = true

    return (
      <video
        ref="video"
        autoPlay={autoplay}
        poster={this.props.poster}
        width="480" height="270" controls preload="none">
        { this.props.children }
      </video>
    )
  }
}

export default View
