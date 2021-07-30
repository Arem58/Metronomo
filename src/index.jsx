import React from 'react'
import ReactDOM from 'react-dom'

import App from './app/escalas'

const root = document.getElementById('root')

ReactDOM.hydrate(
  <App />,
  root,
)
