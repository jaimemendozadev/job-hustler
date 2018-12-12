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

  componentDidUpdate = async (_prevProps, prevState) => {
    const { authFail } = this.state

    console.log("_prevProps inside CDU ", _prevProps)
    console.log("this.props inside CDU ", this.props)

    if (prevState.authFail !== authFail) {
      const RedirectResult = await callbackDelay()

      console.log("RedirectResult ", RedirectResult)

      this.setState({
        redirectTo: "/login",
      })
    }
  }

  componentDidMount = async () => {
    const {
      location: { state },
    } = this.props

    const AWSSessionPayload = await getCurrentAWSSession()

    console.log("AWSSessionPayload  is ", AWSSessionPayload)

    if (AWSSessionPayload.error === true) {
      const message =
        "There was an error verifying your session. Try Logging in again."

      this.setState({
        authFail: true,
        statusMessage: message,
      })
    } else {
      const { email, email_verified } = AWSSessionPayload

      if (state.email === email && email_verified === true) {
        this.setState({
          isAuthenticated: true,
        })
      }
    }
  }

  render() {
    console.log("this.props inside Protectedroute ", this.props)
    const { component: RenderComponent, ...rest } = this.props
    const { isAuthenticated, authFail, statusMessage, redirectTo } = this.state

    if (redirectTo.length) {
      return <Redirect to={redirectTo} />
    }

    if (isAuthenticated === false && !authFail) {
      return <StatusMessage statusMessage="Authenticating..." />
    }

    if (authFail === true && statusMessage) {
      return <StatusMessage statusMessage={statusMessage} />
    }

    return <Route {...rest} render={props => <RenderComponent {...props} />} />
  }
}

export default ProtectedRoute
