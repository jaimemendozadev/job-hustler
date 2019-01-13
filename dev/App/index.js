/* eslint no-unused-vars: 0 */

import React from "react"
import Amplify from "aws-amplify"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ProtectedRoute from "./Components/ProtectedRoute"
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Enroll from "./Components/Enroll"
import EmailFinder from "./Components/EmailFinder"
import config from "./Services/AWS"
import styles from "./Sass/index.scss"

Amplify.configure(config)

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/search" component={EmailFinder} />
      <ProtectedRoute path="/enroll" component={Enroll} />
    </Switch>
  </BrowserRouter>
)

export default App
