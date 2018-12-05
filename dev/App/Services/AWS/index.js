import Amplify from "aws-amplify"

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

export default config
