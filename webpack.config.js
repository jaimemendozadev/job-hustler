const path = require("path")
const webpack = require("webpack")

const { HotModuleReplacementPlugin } = webpack
const Dotenv = require("dotenv-webpack")
const webpackMerge = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const publicFolder = path.resolve(__dirname, "public")
const entry = path.resolve(__dirname, "dev/index.js")
const presets = require("./webpack/presets/webpack.analyze")

module.exports = ({ mode } = { mode: "production" }) =>
  webpackMerge(
    {
      entry,
      mode,
      devtool: "source-map",
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
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.scss$/,
            use: [
              mode === "development"
                ? "style-loader"
                : MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
            ],
          },
        ],
      },
      plugins: [
        new Dotenv(),
        new HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),
      ],
    },
    presets(),
  )
