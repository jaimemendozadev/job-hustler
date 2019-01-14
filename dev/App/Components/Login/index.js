// @flow
import React, { Component } from "react"
import { loginToApp } from "../../Services/AWS"
import Input from "../Input"
import checkPassInput from "./utils"

const defaultState = {
  email: "Email",
  password: "Password",
}

type State = {
  email: string,
  password: string,
}

class Login extends Component<{}, State> {
  state = defaultState

  handleOnBlur = (labelType: string) => {
    const stateValue = this.state[labelType]
    const defaultValue = defaultState[labelType]

    if (stateValue.length === 0) {
      this.setState({
        [labelType]: defaultValue,
      })
    }
  }

  handleOnFocus = (labelType: string) => {
    const stateValue = this.state[labelType]

    const defaultValue = defaultState[labelType]

    if (stateValue === defaultValue) {
      this.setState({
        [labelType]: "",
      })
    }
  }

  handleInput = (evt?: SyntheticInputEvent<EventTarget>, labelType: string) => {
    if (evt !== undefined) {
      const { value } = evt.target
      this.setState({ [labelType]: value })
    }
  }

  handleLogin = async (evt: SyntheticInputEvent<EventTarget>) => {
    evt.preventDefault()

    const { email, password } = this.state

    await loginToApp(email, password)
  }

  render() {
    const { email, password } = this.state

    return (
      <form className="form" onSubmit={this.handleLogin}>
        <h1>Login</h1>
        <Input
          htmlFor="email"
          label="Email"
          onBlur={() => this.handleOnBlur("email")}
          onFocus={() => this.handleOnFocus("email")}
          onChange={evt => this.handleInput(evt, "email")}
          type="text"
          id="email"
          value={email}
        />

        <Input
          htmlFor="password"
          label="Password"
          onBlur={() => this.handleOnBlur("password")}
          onFocus={() => this.handleOnFocus("password")}
          onChange={evt => this.handleInput(evt, "password")}
          type={checkPassInput(password)}
          id="password"
          value={password}
        />
        <div className="form-btn-container">
          <button type="submit">Login</button>
        </div>
      </form>
    )
  }
}

export default Login
