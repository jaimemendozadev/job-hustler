// @flow
import React, { Component } from "react"
import { getCurrentAWSSession } from "../../Services/AWS"

type Props = {
  RenderComponent: () => mixed,
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
    const { RenderComponent } = this.props
    const { isAuthenticated } = this.state

    console.log("isAuthenticated is ", isAuthenticated)
    return (
      <div>
        <RenderComponent />
      </div>
    )
  }
}

export default ProtectedRoute
