// @flow
import Amplify, { Auth } from "aws-amplify"
import createErrorObject from "./utils"

type ErrorObject = {
  error: boolean,
  message: string,
}

const AWS_USER_POOL_ID = process.env.AWS_USER_POOL_ID
const AWS_FED_POOL_ID = process.env.AWS_FED_POOL_ID
const AWS_CLIENT_ID = process.env.AWS_CLIENT_ID

const putInStorage = stuff => {
  console.log("stuff inside storage is ", stuff)
}

const config = Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: AWS_FED_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: AWS_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: AWS_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    storage: putInStorage,
  },
})

const signUpAWS = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): boolean | ErrorObject => {
  try {
    const signUpResult = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        given_name: firstName,
        family_name: lastName,
      },
    })

    const { user } = signUpResult
    const { pool } = user

    console.log("signUpResult is ", signUpResult)
    console.log("pool is ", pool)

    if (pool.clientId !== AWS_CLIENT_ID) {
      return createErrorObject(
        "There was an error registering you. Please try again.",
      )
    }
    return true
  } catch (error) {
    console.log("Error signing up user to AWS ", error)

    const { message } = error

    return createErrorObject(message)
  }
}

const confirmAWSSignUp = async (username: string, code: string) => {
  try {
    // After retrieveing the confirmation code from the user
    const confirmAWSResult = await Auth.confirmSignUp(username, code, {
      forceAliasCreation: false,
    })

    return confirmAWSResult
  } catch (error) {
    console.log("Error confirming User sign up to AWS ", error)

    const { message } = error

    return createErrorObject(message)
  }
}

const getCurrentAWSSession = async () => {
  try {
    const sessionResult = Auth.currentSession()

    console.log("sessionResult from AWS is ", sessionResult)

    return sessionResult
  } catch (error) {
    console.log("Error getting Session Info for Current User ", error)

    const { message } = error

    return createErrorObject(message)
  }
}

export { signUpAWS, confirmAWSSignUp, getCurrentAWSSession }

export default config
