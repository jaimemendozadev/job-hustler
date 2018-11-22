import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Signup from "./Components/Signup"

const App = () => (
  <BrowserRouter>
    <Route path="/signup" component={Signup} />
  </BrowserRouter>
)

export default App
