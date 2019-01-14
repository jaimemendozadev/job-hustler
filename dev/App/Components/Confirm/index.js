// @flow
import React, { Component } from "react"
import Input from "../Input"
import StatusMessage from "../StatusMessage"
import { confirmAWSSignUp, loginToApp } from "../../Services/AWS"

const defaultState = {
  email: "Please enter your email.",
  code: "Please enter your code.",
  password: "",
  successConfirm: false,
  statusMessage: "",
  redirectPath: "/search",
}

type History = {
  push: (pathObject: { pathname: string, state: { email: string } }) => void,
}

type Props = {
  email: string,
  password: string,
  history: History,
  location: {},
  match: {},
  redirectPath: string,
}

type State = {
  email: string,
  code: string,
  successConfirm: boolean,
  statusMessage: string,
  password: string,
  redirectPath: string,
}

class Confirm extends Component<Props, State> {
  state = {
    ...defaultState,
    ...{
      email: this.props.email,
      password: this.props.password,
      redirectPath: this.props.redirectPath,
    },
  }

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
    const { history } = this.props
    const { email, password, redirectPath } = this.state

    console.log("this.state inside handleRedirect ", this.state)
    console.log("this.props inside handleRedirect ", this.props)

    // Login to App
    await loginToApp(email, password)

    // Redirect User to /enroll
    const pathToSearch = {
      pathname: redirectPath,
      state: { email },
    }

    history.push(pathToSearch)
  }

  handleConfirmation = async (evt: SyntheticInputEvent<EventTarget>) => {
    evt.preventDefault()
    const { email, code } = this.state

    console.log("this.state before confirm AWS Sign Up ", this.state)

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
    console.log("this.state inside Confirm ", this.state)

    return (
      <form className="form" onSubmit={this.handleConfirmation}>
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

        <div className="form-btn-container">
          <button type="submit">Confirm</button>
        </div>

        <StatusMessage statusMessage={statusMessage} />
      </form>
    )
  }
}

export default Confirm
