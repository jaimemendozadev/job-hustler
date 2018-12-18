const path = require("path")
const webpack = require("webpack")

const { HotModuleReplacementPlugin } = webpack
const Dotenv = require("dotenv-webpack")

const publicFolder = path.resolve(__dirname, "public")
const entry = path.resolve(__dirname, "dev/index.js")

module.exports = {
  entry,
  mode: "development",
  output: {
    path: publicFolder,
    filename: "bundle.js",
  },
  devServer: {
    contentBase: "public",
    historyApiFallback: true, // Handles Client Side Routing
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
    ],
  },
  plugins: [new Dotenv(), new HotModuleReplacementPlugin()],
}
