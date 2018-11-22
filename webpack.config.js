const path = require("path");
const webpack = require('webpack');
const publicFolder = path.resolve(__dirname, "public");
const entry = path.resolve(__dirname, "dev/index.js");

module.exports = {
  entry,
  mode: "development",
  output: {
    path: publicFolder,
    filename: "bundle.js",
  },
  devServer: {
    contentBase: "public"
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}