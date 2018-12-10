import React from "react"
import { render, fireEvent, cleanup } from "react-testing-library"
import Signup from "Signup"
import { signUpAWS as mockSignUpAWS } from "AWS"

afterEach(() => {
  cleanup()
})

jest.mock("AWS", () => ({
  signUpAWS: jest.fn(() => Promise.resolve(true)),
}))

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

test("On failing Email Input validation, will render error message ", () => {
  const { getByLabelText, getByText, getByTestId } = render(<Signup />)

  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)
  const firstName = getByLabelText(/first name/i)
  const lastName = getByLabelText(/last name/i)

  const emailInput = { target: { value: "blorg_at_gmail.com" } }
  const passwordInput = { target: { value: "87^ghY&r" } }
  const firstNameInput = { target: { value: "Blorg" } }
  const lastNameInput = { target: { value: "Smith" } }

  fireEvent.change(email, emailInput)
  fireEvent.change(password, passwordInput)
  fireEvent.change(firstName, firstNameInput)
  fireEvent.change(lastName, lastNameInput)

  const button = getByText(/sign up/i)
  const errorMsg = getByTestId("status-msg")

  fireEvent.click(button)

  expect(errorMsg).toHaveTextContent("Enter a valid email address.")
})

test("On failing Password Input validation, will render error message ", () => {
  const { getByLabelText, getByText, getByTestId } = render(<Signup />)

  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)
  const firstName = getByLabelText(/first name/i)
  const lastName = getByLabelText(/last name/i)

  const emailInput = { target: { value: "blorg@gmail.com" } }
  const passwordInput = { target: { value: "123" } }
  const firstNameInput = { target: { value: "Blorg" } }
  const lastNameInput = { target: { value: "Smith" } }

  fireEvent.change(email, emailInput)
  fireEvent.change(password, passwordInput)
  fireEvent.change(firstName, firstNameInput)
  fireEvent.change(lastName, lastNameInput)

  const button = getByText(/sign up/i)
  const errorMsg = getByTestId("status-msg")

  fireEvent.click(button)

  expect(errorMsg).toHaveTextContent(
    "Password must be at least 8 characters long.",
  )
})

test("On Passing Input validation, Confrmation Form render shows successful User Sign Up", async () => {
  const { getByLabelText, getByText, getByTestId } = render(<Signup />)

  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)
  const firstName = getByLabelText(/first name/i)
  const lastName = getByLabelText(/last name/i)

  const emailInput = { target: { value: "blorg@gmail.com" } }
  const passwordInput = { target: { value: "87^ghY&r" } }
  const firstNameInput = { target: { value: "Blorg" } }
  const lastNameInput = { target: { value: "Smith" } }

  fireEvent.change(email, emailInput)
  fireEvent.change(password, passwordInput)
  fireEvent.change(firstName, firstNameInput)
  fireEvent.change(lastName, lastNameInput)

  const button = getByText(/sign up/i)

  fireEvent.click(button)

  expect(mockSignUpAWS).toHaveBeenCalledTimes(1)
  expect(mockSignUpAWS).toHaveBeenCalledWith(
    email.value,
    password.value,
    firstName.value,
    lastName.value,
  )

  const AWSCode = await mockSignUpAWS(
    email.value,
    password.value,
    firstName.value,
    lastName.value,
  )

  expect(AWSCode).toEqual(true)
  const confirmForm = getByTestId("success-signup-msg")

  expect(confirmForm).toHaveTextContent(
    /One Final Step: Enter Your Job Hustler Validation Code/i,
  )
})
