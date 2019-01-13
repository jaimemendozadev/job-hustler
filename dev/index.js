/* eslint no-unused-vars: 0 */
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import styles from "./App/Sass/index.scss"

ReactDOM.render(<App />, document.querySelector(".container"))

module.hot.accept()
