import React from "react"
import { render, fireEvent, cleanup } from "react-testing-library"
import Signup from "Signup"

afterEach(() => {
  cleanup()
})

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

test("Can enter Username in Input", () => {
  const { getByLabelText } = render(<Signup />)

  const usernameInput = getByLabelText(/username/i)

  const testUser = "random_person"

  fireEvent.change(usernameInput, { target: { value: testUser } })

  expect(usernameInput.value).toBe(testUser)
})

test("Can enter Password in Input", () => {
  const { getByLabelText } = render(<Signup />)

  const passInput = getByLabelText(/password/i)

  const fakePass = "12345"

  fireEvent.change(passInput, { target: { value: fakePass } })

  expect(passInput.value).not.toBe(fakePass)
})
