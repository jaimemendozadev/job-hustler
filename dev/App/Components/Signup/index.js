// @flow
import React, { Component } from "react"
import { signUpAWS } from "../../Services/AWS"
import Input from "../Input"
import ErrorMessage from "../ErrorMessage"
import { checkPassInput, checkForValidInputs } from "./utils"

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
  errorMessage: string,
}

class Signup extends Component<{}, State> {
  state = {
    ...defaultState,
    errorMessage: "",
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
      const AWSCode = await signUpAWS(email, password, firstName, lastName)
      console.log("AWSCode is ", AWSCode)
    } else {
      this.setState({ errorMessage: stateCheck.message })
    }
  }

  render() {
    const { email, password, firstName, lastName, errorMessage } = this.state
    return (
      <form onSubmit={this.handleSignUp}>
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

        <button type="submit">Sign Up</button>
        <ErrorMessage errorMessage={errorMessage} />
      </form>
    )
  }
}

export default Signup
