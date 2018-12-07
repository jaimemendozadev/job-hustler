import Amplify, { Auth } from "aws-amplify"

const AWS_USER_POOL_ID = process.env.AWS_USER_POOL_ID
const AWS_FED_POOL_ID = process.env.AWS_FED_POOL_ID
const AWS_CLIENT_ID = process.env.AWS_CLIENT_ID

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
  },
})

const signUpAWS = async (email, password, firstName, lastName) => {
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

    console.log("signUpResult from AWS is ", signUpResult)

    return signUpResult
  } catch (error) {
    console.log("Error signing up user to AWS ", error)
    const errorMessage = {
      error: true,
      message: "There was an error registering you. Please try again.",
    }
    return errorMessage
  }
}

const confirmAWSSignUp = async (username, code) => {
  try {
    // After retrieveing the confirmation code from the user
    const signInResult = await Auth.confirmSignUp(username, code)

    console.log("signInResult from AWS is ", signInResult)

    return signInResult
  } catch (error) {
    console.log("Error signing in user to AWS ", error)

    const errorMessage = {
      error: true,
      message:
        "There was an error signing you into the application. Please try again.",
    }
    return errorMessage
  }
}

export { signUpAWS, confirmAWSSignUp }

export default config
