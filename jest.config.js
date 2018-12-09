module.exports = {
  moduleNameMapper: {
    Signup: "<rootDir>/dev/App/Components/Signup",
    AWS: "<rootDir>/dev/App/Services/AWS",
  },
  setupTestFrameworkScriptFile: require.resolve("./jest.setup.js"),
}
