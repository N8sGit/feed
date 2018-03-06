import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import Editor from './components/editor'
// establishes socket connection
import './socket'

ReactDOM.render(
<div>
  <Provider store={store}>
    <Routes />
  </Provider>,
</div>,
  document.getElementById('app')
)
