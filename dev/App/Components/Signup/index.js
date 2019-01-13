// @flow
import React, { Component } from "react"
import { signUpAWS } from "../../Services/AWS"
import Input from "../Input"
import StatusMessage from "../StatusMessage"
import { checkPassInput, checkForValidInputs } from "./utils"

const Confirm = () => import("../Confirm")

const defaultState = {
  email: "Email",
  password: "Password",
  firstName: "First Name",
  lastName: "Last Name",
}

type State = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  statusMessage: string,
  initSignUpSuccess: boolean,
}

type History = {
  push: (pathObject: { pathname: string, state: { email: string } }) => void,
}

type Props = {
  history: History,
  location: {},
  match: {},
}

class Signup extends Component<Props, State> {
  state = {
    ...defaultState,
    statusMessage: "",
    initSignUpSuccess: false,
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

  handleSignUp = async (evt: SyntheticInputEvent<EventTarget>) => {
    evt.preventDefault()

    const stateCheck = checkForValidInputs(this.state, defaultState)

    if (stateCheck.error === false) {
      const { email, password, firstName, lastName } = this.state
      const AWSSignUpResponse = await signUpAWS(
        email,
        password,
        firstName,
        lastName,
      )

      if (AWSSignUpResponse.error === true) {
        const { message } = AWSSignUpResponse
        this.setState({ ...defaultState, statusMessage: message })
      } else {
        // Save email and password to pass to <Confirm />
        const newState = { ...defaultState, ...{ email, password } }

        const ConfirmResult = await Confirm()

        this.setState({
          initSignUpSuccess: true,
          statusMessage: "",
          ...newState,
          module: ConfirmResult.default,
        })
      }
    } else {
      this.setState({ statusMessage: stateCheck.message })
    }
  }

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      statusMessage,
      initSignUpSuccess,
      module: Module,
    } = this.state

    if (initSignUpSuccess === true) {
      // Pass email/password to <Confirm /> to avoid asking User to reenter info
      return (
        <Module
          {...this.props}
          email={email}
          password={password}
          redirectPath="/enroll"
        />
      )
    }

    return (
      <form className="signup-form" onSubmit={this.handleSignUp}>
        <h1>Signup</h1>
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

        <Input
          htmlFor="first name"
          label="First Name"
          onBlur={() => this.handleOnBlur("firstName")}
          onFocus={() => this.handleOnFocus("firstName")}
          onChange={evt => this.handleInput(evt, "firstName")}
          type="text"
          id="first name"
          value={firstName}
        />

        <Input
          htmlFor="last name"
          label="Last Name"
          onBlur={() => this.handleOnBlur("lastName")}
          onFocus={() => this.handleOnFocus("lastName")}
          onChange={evt => this.handleInput(evt, "lastName")}
          type="text"
          id="last name"
          value={lastName}
        />

        <div className="signup-btn-container">
          <button type="submit">Sign Up</button>
        </div>

        <StatusMessage statusMessage={statusMessage} />
      </form>
    )
  }
}

export default Signup
