import React, { Component } from "react"
import { API } from "aws-amplify"

const AWS_API_GATEWAY_NAME = process.env.AWS_API_GATEWAY_NAME

class EmailFinder extends Component {
  componentDidMount = async () => {
    const init = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
    const AWSResult = await API.get(AWS_API_GATEWAY_NAME, "/search", init)

    console.log("AWSResult from CDM Search is ", AWSResult)
  }

  render() {
    return (
      <div>
        <h1>Email Finder</h1>
      </div>
    )
  }
}

export default EmailFinder
