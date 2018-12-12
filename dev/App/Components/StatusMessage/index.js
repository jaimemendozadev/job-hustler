// @flow
import React from "react"

type Props = {
  statusMessage: string,
}

const StatusMessage = (props: Props) => (
  <div data-testid="status-msg">
    {props.statusMessage.length ? `${props.statusMessage}` : null}
  </div>
)

export default StatusMessage
