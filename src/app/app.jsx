import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Metronomo from './metronomo'
import Escalas from './escalas'

const App = () => (
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

export default App
