import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "Hello World!",
    }
  }
  render() {
    const { message } = this.state
    return <h1>{message}</h1>
  }
}

ReactDOM.render(<App />, document.querySelector(".container"))

module.hot.accept()
