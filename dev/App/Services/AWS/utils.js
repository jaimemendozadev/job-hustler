// @flow
const createErrorObject = (message: string) => {
  const errorObject = { error: true, message: "" }

  errorObject.message = message
  return errorObject
}

export default createErrorObject
