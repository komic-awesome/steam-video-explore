import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import AV from 'leancloud-storage'

ReactDOM.render(
  <Main />,
  document.body.appendChild(
    document.createElement('div')
  )
);
