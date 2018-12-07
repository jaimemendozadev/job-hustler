export const checkPassInput = passwordInput =>
  passwordInput === "Password" ? "text" : "password"

export const checkStateObject = (state, defaults) => {
  const errorObject = { error: true, message: "" }
  const stateKeys = Object.keys(defaults)

  // Check for default values
  for (let i = 0; i < stateKeys.length; i += 1) {
    const key = stateKeys[i]
    if (defaults[key] === state[key]) {
      errorObject.error = true
      errorObject.message = `Enter a valid ${defaults[key]}`
      return errorObject
    }
  }

  return null
}
