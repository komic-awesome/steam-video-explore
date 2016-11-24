import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'jumpstate'
import { debounce } from 'lodash'

class View extends Component {
  handleViewportChanged(event) {
    Actions.viewportChanged({
      list: this.props.list,
    })
  }

  componentWillMount() {
    window.addEventListener('scroll',
      debounce(this.handleViewportChanged.bind(this), 300))
  }

  render() {
    return <div>{ this.props.children }</div>
  }
}

export default connect((state, ownProps) => {
  let list = state.videoList.collection || []
  return { list, }
})(View)
