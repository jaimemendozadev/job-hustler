// @flow
import React, { Component } from "react"

type State = {
  username: string,
  code: string,
}

class Confirm extends Component<{}, State> {
  state = {
    username: "Please enter your user name.",
    code: "Please enter your code.",
  }

  render() {
    const { username, code } = this.state
    return (
      <form>
        <h1>Confirm</h1>
        <input value={username} type="text" />
        <input value={code} type="text" />
      </form>
    )
  }
}

export default Confirm
