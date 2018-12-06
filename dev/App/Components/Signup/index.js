import React, { Component } from "react"
// import { signUpAWS } from "../../Services/AWS"

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "Username",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
    }
  }

  handleInput = (evt, labelType) => {
    this.setState({ [labelType]: evt.target.value })
  }

  render() {
    const { username, password, firstName, lastName } = this.state
    return (
      <form>
        <h1>Signup</h1>
        <label htmlFor="username">
          Username
          <input
            onChange={evt => this.handleInput(evt, "username")}
            type="text"
            id="username"
            value={username}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            onChange={evt => this.handleInput(evt, "password")}
            type="text"
            id="password"
            value={password}
          />
        </label>

        <label htmlFor="first name">
          First Name
          <input
            onChange={evt => this.handleInput(evt, "firstName")}
            type="text"
            id="first name"
            value={firstName}
          />
        </label>

        <label htmlFor="last name">
          Last Name
          <input
            onChange={evt => this.handleInput(evt, "lastName")}
            type="text"
            id="last name"
            value={lastName}
          />
        </label>
      </form>
    )
  }
}

export default Signup
