// @flow
import React from "react"

type Props = {
  statusMessage: string,
}

const StatusMessage = (props: Props) => (
  <h2 data-testid="status-msg">
    {props.statusMessage.length ? `${props.statusMessage}` : null}
  </h2>
)

export default StatusMessage
