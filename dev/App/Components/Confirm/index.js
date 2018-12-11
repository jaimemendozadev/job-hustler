// @flow
import React, { Component } from "react"
import Input from "../Input"
import StatusMessage from "../StatusMessage"
import { confirmAWSSignUp, loginToApp } from "../../Services/AWS"

const defaultState = {
  email: "Please enter your email.",
  code: "Please enter your code.",
  successConfirm: false,
  statusMessage: "",
}

type Props = {
  password: string,
}

type State = {
  email: string,
  code: string,
  successConfirm: boolean,
  statusMessage: string,
}

class Confirm extends Component<Props, State> {
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

  handleRedirect = async () => {
    const { password, history } = this.props
    const { email } = this.state

    // Login to App
    await loginToApp(email, password)

    // Redirect User to /search
    const pathToSearch = {
      pathname: "/search",
      state: { email },
    }

    history.push(pathToSearch)
  }

  handleConfirmation = async (evt: SyntheticInputEvent<EventTarget>) => {
    evt.preventDefault()
    const { email, code } = this.state

    const confirmAWSResult = await confirmAWSSignUp(email, code)

    if (confirmAWSResult === "SUCCESS") {
      this.setState(
        {
          statusMessage: "Your account was successfully confirmed!",
        },
        this.handleRedirect,
      )
    } else {
      const { message } = confirmAWSResult

      this.setState({
        statusMessage: message,
      })
    }
  }

  render() {
    const { email, code, statusMessage } = this.state

    return (
      <form onSubmit={this.handleConfirmation}>
        <h1 data-testid="success-signup-msg">
          One Final Step: Enter Your Job Hustler Validation Code!
        </h1>
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
        <StatusMessage callback={null} statusMessage={statusMessage} />
      </form>
    )
  }
}

export default Confirm
