/* eslint camelcase: 0 */
// @flow
import React, { Component } from "react"
import { Route } from "react-router-dom"
import { getCurrentAWSSession } from "../../Services/AWS"
import StatusMessage from "../StatusMessage"

const defaultState = {
  isAuthenticated: false,
  authFail: false,
  statusMessage: "",
}

type Props = {
  component: () => any,
  path: string,
}

type State = {
  isAuthenticated: boolean,
  authFail: boolean,
  statusMessage: string,
}

class ProtectedRoute extends Component<Props, State> {
  state = defaultState

  componentDidMount = async () => {
    const {
      location: { state },
    } = this.props

    const AWSSessionPayload = await getCurrentAWSSession()

    console.log("AWSSessionPayload  is ", AWSSessionPayload)

    const { email, email_verified } = AWSSessionPayload

    if (state.email === email && email_verified === true) {
      this.setState({
        isAuthenticated: true,
      })
    }

    if (AWSSessionPayload.error === true) {
      const message =
        "There was an error verifying your session. Try Logging in again."

      this.setState({
        statusMessage: message,
      })
    }
  }

  render() {
    console.log("this.props inside Protectedroute ", this.props)
    const { component: RenderComponent, ...rest } = this.props
    const { isAuthenticated, authFail, statusMessage } = this.state

    if (isAuthenticated === false) {
      return <h1>Authenticating...</h1>
    }

    if (authFail === true && statusMessage) {
      return <StatusMessage statusMessage={statusMessage} />
    }

    return <Route {...rest} render={props => <RenderComponent {...props} />} />
  }
}

export default ProtectedRoute
