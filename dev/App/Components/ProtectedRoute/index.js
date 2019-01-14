/* eslint camelcase: 0 */
// @flow
import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { getCurrentAWSSession } from "../../Services/AWS"
import StatusMessage from "../StatusMessage"
import callbackDelay from "./utils"

const defaultState = {
  isAuthenticated: false,
  authFail: false,
  statusMessage: "",
  redirectTo: "",
}

type Props = {
  component: () => any,
  path: string,
}

type State = {
  isAuthenticated: boolean,
  authFail: boolean,
  statusMessage: string,
  redirectTo: string,
}

class ProtectedRoute extends Component<Props, State> {
  state = defaultState

  componentDidUpdate = async (
    _prevProps: {},
    prevState: { authFail: boolean },
  ) => {
    const { authFail } = this.state

    if (prevState.authFail !== authFail) {
      await callbackDelay()

      this.setState({
        redirectTo: "/login",
      })
    }
  }

  componentDidMount = async () => {
    const AWSSessionPayload = await getCurrentAWSSession()

    if (AWSSessionPayload.error === true) {
      const message =
        "There was an error verifying your session. Try Logging in again."

      this.setState({
        authFail: true,
        statusMessage: message,
      })
    } else {
      const { email, email_verified } = AWSSessionPayload

      if (email && email_verified === true) {
        this.setState({
          isAuthenticated: true,
        })
      }
    }
  }

  render() {
    const { component: RenderComponent, ...rest } = this.props
    const { isAuthenticated, authFail, statusMessage, redirectTo } = this.state

    // First, try Authenticating user in CDM
    if (isAuthenticated === false && !authFail) {
      return <StatusMessage statusMessage="Authenticating..." />
    }

    // If Auth fails, display message and set redirect state in CDU
    if (authFail === true && statusMessage) {
      return <StatusMessage statusMessage={statusMessage} />
    }

    // Render component or redirect based on auth success or failure
    return redirectTo.length > 0 ? (
      <Redirect to={redirectTo} />
    ) : (
      <Route {...rest} render={props => <RenderComponent {...props} />} />
    )
  }
}

export default ProtectedRoute
