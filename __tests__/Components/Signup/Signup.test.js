import React from "react"
import { render, cleanup } from "react-testing-library"
import Signup from "Signup"

afterEach(() => {
  cleanup()
})

describe("Testing Signup Form", () => {
  test("Container renders", () => {
    const { container } = render(<Signup />)
    expect(container).toHaveTextContent(/signup/i)
  })

  test("Labels/Inputs render", () => {
    const { getByLabelText } = render(<Signup />)
    const usernameInput = getByLabelText(/username/i)

    expect(usernameInput).toHaveAttribute("type", "text")

    const passInput = getByLabelText(/password/i)

    expect(passInput).toHaveAttribute("type", "text")
  })
})
