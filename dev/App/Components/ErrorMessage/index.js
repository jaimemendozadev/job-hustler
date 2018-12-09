// @flow
import React from "react"

type Props = {
  errorMessage: string,
}

const ErrorMessage = (props: Props) => (
  <div data-testid="signup-error-msg">
    {props.errorMessage.length ? `${props.errorMessage}` : null}
  </div>
)

export default ErrorMessage
