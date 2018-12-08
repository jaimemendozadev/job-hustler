// @flow

type State = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  errorMessage: string,
}

type Defaults = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

type ErrorObject = {
  error: boolean,
  message: string,
}

const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

const createErrorObject = (message: string): ErrorObject => {
  const errorObject = { error: false, message: "" }

  errorObject.error = true
  errorObject.message = message
  return errorObject
}

export const checkPassInput = (passwordInput: string) =>
  passwordInput === "Password" ? "text" : "password"

export const checkStateObject = (
  state: State,
  defaults: Defaults,
): ErrorObject => {
  const { email } = state

  const stateKeys = Object.keys(defaults)

  // Check for default values
  for (let i = 0; i < stateKeys.length; i += 1) {
    const key = stateKeys[i]
    if (defaults[key] === state[key]) {
      return createErrorObject(`Enter a valid ${defaults[key]}`)
    }
  }

  // Check for valid email
  if (validateEmail(email) === false) {
    return createErrorObject("Enter a valid email address.")
  }

  return { error: false, message: "" }
}
