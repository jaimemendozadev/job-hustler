import React from "react"
import Amplify from "aws-amplify"
import { BrowserRouter, Route } from "react-router-dom"
import Signup from "./Components/Signup"
import config from "./Services/AWS"

Amplify.configure(config)

const App = () => (
  <BrowserRouter>
    <Route path="/signup" component={Signup} />
  </BrowserRouter>
)

export default App
