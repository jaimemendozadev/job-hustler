// @flow
import React, { Component } from "react"
import Input from "../Input"

const defaultState = {
  username: "Please enter your user name.",
  code: "Please enter your code.",
}

type State = {
  username: string,
  code: string,
}

class Confirm extends Component<{}, State> {
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

  handleSignUp = async (evt: SyntheticInputEvent<EventTarget>) => {
    evt.preventDefault()
  }

  render() {
    const { username, code } = this.state
    return (
      <form onSubmit={this.handleSignUp}>
        <h1 data-testid="success-signup-msg">
          One Final Step: Enter Your Job Hustler Validation Code!
        </h1>
        <Input
          htmlFor="username"
          label="Username"
          onBlur={() => this.handleOnBlur("username")}
          onFocus={() => this.handleOnFocus("username")}
          onChange={evt => this.handleInput(evt, "username")}
          type="text"
          id="username"
          value={username}
        />

        <Input
          htmlFor="code"
          label="Validation Code"
          onBlur={() => this.handleOnBlur("code")}
          onFocus={() => this.handleOnFocus("code")}
          onChange={evt => this.handleInput(evt, "code")}
          type="text"
          id="code"
          value={code}
        />
        <button type="submit">Confirm</button>
      </form>
    )
  }
}

export default Confirm
