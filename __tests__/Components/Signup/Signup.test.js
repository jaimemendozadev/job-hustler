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
  const emailInput = getByLabelText(/email/i)

  expect(emailInput).toHaveAttribute("type", "text")

  const passInput = getByLabelText(/password/i)

  expect(passInput).toHaveAttribute("type", "text")

  const fakePass = "12345"

  fireEvent.change(passInput, { target: { value: fakePass } })

  expect(passInput).toHaveAttribute("type", "password")
})

test("Can enter Username in Input", () => {
  const { getByLabelText } = render(<Signup />)

  const emailInput = getByLabelText(/email/i)

  const testUser = "random_person@gmail.com"

  fireEvent.change(emailInput, { target: { value: testUser } })

  expect(emailInput.value).toBe(testUser)
})

test("Can enter Password in Input", () => {
  const { getByLabelText } = render(<Signup />)

  const passInput = getByLabelText(/password/i)

  const fakePass = "12345"

  fireEvent.change(passInput, { target: { value: fakePass } })

  expect(passInput.value).toBe(fakePass)
})

test("Can enter First Name in Input", () => {
  const { getByLabelText } = render(<Signup />)

  const firstNameInput = getByLabelText(/First Name/i)

  expect(firstNameInput).toHaveAttribute("type", "text")

  fireEvent.click(firstNameInput, { target: { value: "Joseph" } })

  expect(firstNameInput.value).toBe("Joseph")
})

test("Can enter Last Name in Input", () => {
  const { getByLabelText } = render(<Signup />)
  const lastNameInput = getByLabelText(/last name/i)

  expect(lastNameInput).toHaveAttribute("type", "text")

  fireEvent.click(lastNameInput, { target: { value: "Smith" } })

  expect(lastNameInput.value).toBe("Smith")
})
