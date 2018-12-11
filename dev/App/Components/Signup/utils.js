// @flow
/* eslint no-useless-escape: 0 */

type StateArg = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
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

const validatePassword = (password: string): string => {
  const specialCharsRegex = /[\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\\\,\>\<\'\:\;\|\_\~\`]/

  // Check password length
  if (password.length <= 7) {
    return "Password must be at least 8 characters long."
  }

  // Check for legitimate characters
  if (password.search(/[a-zA-Z]/) === -1) {
    return "You must use Roman Letters in your password."
  }

  // Check for uppercase letters
  if (password.search(/[A-Z]/) === -1) {
    return "Password must include at least one Uppercase letter."
  }

  // Check for special characters
  if (password.search(specialCharsRegex) === -1) {
    return "Password must include at least one Special character."
  }

  // Check for numbers
  if (password.search(/[0-9]/) === -1) {
    return "Password must include at least one Number."
  }

  return "Password passes validation."
}

const createErrorObject = (message: string): ErrorObject => {
  const errorObject = { error: true, message: "" }

  errorObject.message = message
  return errorObject
}

export const checkPassInput = (passwordInput: string) =>
  passwordInput === "Password" ? "text" : "password"

export const checkForValidInputs = (
  state: StateArg,
  defaults: Defaults,
): ErrorObject => {
  const { email, password } = state

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

  // Check for valid password
  const passwordCheck = validatePassword(password)

  if (passwordCheck !== "Password passes validation.") {
    return createErrorObject(passwordCheck)
  }

  return { error: false, message: "" }
}
