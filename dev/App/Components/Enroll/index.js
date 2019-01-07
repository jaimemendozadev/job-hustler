import React, { Component } from "react"
import { getCurrentAWSUser } from "../../Services/AWS"

class Enroll extends Component {
  componentDidMount = async () => {
    const currentAWSUser = await getCurrentAWSUser()

    const { attributes } = currentAWSUser

    console.log("attributes are ", attributes)
  }

  render() {
    return (
      <div>
        <h1>Enroll New User</h1>
      </div>
    )
  }
}

export default Enroll
