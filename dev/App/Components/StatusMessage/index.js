// @flow
import React from "react"

type Props = {
  statusMessage: string,
  callback: null | (() => any),
}

const handleCallback = (callback: () => any) => {
  console.log("inside handleCallback")
  callback()
}

const StatusMessage = (props: Props) => (
  <div data-testid="status-msg">
    {props.statusMessage.length ? `${props.statusMessage}` : null}
    {props.callback ? handleCallback(props.callback) : null}
  </div>
)

export default StatusMessage
