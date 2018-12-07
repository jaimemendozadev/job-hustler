// @flow
import React from "react"

type Props = {
  htmlFor: string,
  label: string,
  onBlur: () => void,
  onFocus: () => void,
  onChange: () => void,
  type: string,
  id: string,
  value: string,
}

const Input = (props: Props) => (
  <label htmlFor={props.htmlFor}>
    {props.label}
    <input
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onChange={props.onChange}
      type={props.type}
      id={props.id}
      value={props.value}
    />
  </label>
)

export default Input
