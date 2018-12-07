// @flow
import React, { Component } from "react"
import { signUpAWS } from "../../Services/AWS"
import Input from "../Input"
import { checkPassInput, checkStateObject } from "./utils"

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

  handleOnBlur = labelType => {
    const stateValue = this.state[labelType]
    const defaultValue = defaultState[labelType]

    if (stateValue.length === 0) {
      this.setState({
        [labelType]: defaultValue,
      })
    }
  }

  handleOnFocus = labelType => {
    const stateValue = this.state[labelType]

    const defaultValue = defaultState[labelType]

    if (stateValue === defaultValue) {
      this.setState({
        [labelType]: "",
      })
    }
  }

  handleInput = (evt, labelType) => {
    this.setState({ [labelType]: evt.target.value })
  }

  handleSignUp = async evt => {
    evt.preventDefault()
    const stateCheck = checkStateObject(this.state, defaultState)

    if (stateCheck.error === true) {
      this.setState({ errorMessage: stateCheck.message })
    } else {
      const { email, password, firstName, lastName } = this.state
      const AWSCode = await signUpAWS(email, password, firstName, lastName)
      console.log("AWSCode is ", AWSCode)
    }
  }

  render() {
    const { email, password, firstName, lastName, errorMessage } = this.state
    return (
      <form onSubmit={this.handleSignUp}>
        <h1>Signup</h1>
        <Input
          label="Email"
          onBlur={() => this.handleOnBlur("email")}
          onFocus={() => this.handleOnFocus("email")}
          onChange={evt => this.handleInput(evt, "email")}
          type="text"
          id="email"
          value={email}
        />

        <Input
          label="Password"
          onBlur={() => this.handleOnBlur("password")}
          onFocus={() => this.handleOnFocus("password")}
          onChange={evt => this.handleInput(evt, "password")}
          type={checkPassInput(password)}
          id="password"
          value={password}
        />

        <Input
          onBlur={() => this.handleOnBlur("firstName")}
          onFocus={() => this.handleOnFocus("firstName")}
          onChange={evt => this.handleInput(evt, "firstName")}
          type="text"
          id="first name"
          value={firstName}
        />

        <Input
          onBlur={() => this.handleOnBlur("lastName")}
          onFocus={() => this.handleOnFocus("lastName")}
          onChange={evt => this.handleInput(evt, "lastName")}
          type="text"
          id="last name"
          value={lastName}
        />

        <button type="submit">Sign Up</button>
        {errorMessage ? `${errorMessage}` : null}
      </form>
    )
  }
}

export default Signup
