import React, { useState, useEffect, useRef } from 'react'
import Metronomo from './metronomo'
import Escalas from './escalas'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Metronomo />
          </Route>
          <Route path="/escalas">
            <Escalas />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
