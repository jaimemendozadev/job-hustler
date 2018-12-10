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
    console.log("Do something")

    const AWSSessionInfo = getCurrentAWSSession()

    console.log("AWSSessionInfo is ", AWSSessionInfo)
  }

  render() {
    const { component: RenderComponent, ...rest } = this.props
    const { isAuthenticated } = this.state

    if (isAuthenticated === false) {
      return <h1>Authenticating...</h1>
    }
    return <Route {...rest} render={props => <RenderComponent {...props} />} />
  }
}

export default ProtectedRoute
