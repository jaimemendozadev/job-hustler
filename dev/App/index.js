import React from "react"
import Amplify from "aws-amplify"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ProtectedRoute from "./Components/ProtectedRoute"
import Signup from "./Components/Signup"
import EmailFinder from "./Components/EmailFinder"
import config from "./Services/AWS"

Amplify.configure(config)

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signup" component={Signup} />
      <ProtectedRoute component={EmailFinder} path="/search" />
    </Switch>
  </BrowserRouter>
)

export default App
