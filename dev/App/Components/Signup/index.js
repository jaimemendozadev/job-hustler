import React, { Component } from "react"

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "Username",
      password: "Password",
    }
  }

  handleUsername = evt => {
    console.log("firing handleUsername")
    this.setState({ username: evt.target.value })
  }

  render() {
    const { username, password } = this.state
    return (
      <form>
        <h1>Signup</h1>
        <label htmlFor="username">
          Username
          <input
            onChange={this.handleUsername}
            type="text"
            id="username"
            value={username}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            onChange={this.handleUsername}
            type="text"
            id="password"
            value={password}
          />
        </label>
      </form>
    )
  }
}

export default Signup
