/* eslint camelcase: 0 */
// @flow
import React, { Component } from "react"
import StatusMessage from "../StatusMessage"
import FlipCard from "./FlipCard"
import { getCurrentAWSUser } from "../../Services/AWS"

const defaultState = {
  given_name: "",
  family_name: "",
  email: "",
  statusMessage: "Loading...",
  auth: false,
}

type State = {
  given_name: string,
  family_name: string,
  email: string,
  statusMessage: string,
  auth: boolean,
}

class Enroll extends Component<{}, State> {
  state = defaultState

  logOut = (evt?: SyntheticInputEvent<EventTarget>) => {
    console.log("the event is ", evt)
  }

  componentDidMount = async () => {
    const currentAWSUser = await getCurrentAWSUser()

    // Todo: add redirect to /login
    if (!currentAWSUser.attributes) {
      this.setState({
        statusMessage:
          "There was an error getting your credentials. Trying logging in again.",
      })
    } else {
      const {
        attributes: { given_name, family_name, email },
      } = currentAWSUser

      this.setState({
        given_name,
        family_name,
        email,
        auth: true,
      })
    }
  }

  render() {
    const { auth, statusMessage, given_name, family_name, email } = this.state
    console.log("family_name is ", family_name)
    console.log("email is ", email)
    console.log("this.props inside Enroll ", this.props)

    if (!auth) {
      return <StatusMessage statusMessage={statusMessage} />
    }

    return (
      <div className="enroll">
        <h1>Welcome to Job Hustler {given_name}!</h1>
        <h3>Please select a subscription to start job hunting!</h3>

        <div>
          <h2>Available Subscription Plans</h2>
          <FlipCard />

          <h2>
            Or perhaps you&#8216;re not ready to commit. Log out and come back
            later!
          </h2>

          <div className="btn-container">
            <button type="button" onClick={this.logOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Enroll
