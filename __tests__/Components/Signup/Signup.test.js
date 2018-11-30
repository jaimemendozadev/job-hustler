import React from "react"
import { render } from "react-testing-library"
import Signup from "./Signup"

describe("Testing Signup Form", () => {
  test("Container renders", () => {
    const { container, debug } = render(<Signup />)
    debug()

    expect(container).toHaveTextContent(/signup/i)
  })
})
