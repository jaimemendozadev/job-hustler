/* eslint camelcase: 0 */
// @flow
import React, { Component } from "react"
import { Route } from "react-router-dom"
import { getCurrentAWSSession } from "../../Services/AWS"

type Props = {
  component: () => mixed,
  path: string,
}

type State = {
  isAuthenticated: boolean,
}

class ProtectedRoute extends Component<Props, State> {
  state = {
    isAuthenticated: false,
  }

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
  }

  render() {
    console.log("this.props inside Protectedroute ", this.props)
    const { component: RenderComponent, ...rest } = this.props
    const { isAuthenticated } = this.state

    if (isAuthenticated === false) {
      return <h1>Authenticating...</h1>
    }
    return <Route {...rest} render={props => <RenderComponent {...props} />} />
  }
}

export default ProtectedRoute
