// @flow
import React, { Component } from "react"
import Input from "../Input"
import { confirmAWSSignUp, getCurrentAWSSession } from "../../Services/AWS"

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

  handleConfirmation = async (evt: SyntheticInputEvent<EventTarget>) => {
    evt.preventDefault()
    const { username, code } = this.state

    await confirmAWSSignUp(username, code)

    const currentSessionInfo = await getCurrentAWSSession()

    console.log("currentSessionInfo is ", currentSessionInfo)
  }

  render() {
    const { username, code } = this.state
    return (
      <form onSubmit={this.handleConfirmation}>
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
