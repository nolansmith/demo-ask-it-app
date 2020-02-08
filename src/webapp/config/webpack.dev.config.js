const webpack = require("webpack");
const html = require("html-webpack-plugin");
const path = require("path");
const buildDir = path.resolve(__dirname, "../");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  entry: ['@babel/polyfill', path.resolve(__dirname, "../index.js")],
  target: "web",
  devtool: "cheap-module-source-map",
  output: {
    path: buildDir,
    publicPath: "/",
    filename: "bundle.js"
  },
  node: { fs: "empty" },
  devServer: {
    open: true,
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: true
  },
  plugins: [
    new html({
      template: path.resolve(__dirname, "../index.html")
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../images"),
        to: "images"
      },
      {
        from: path.resolve(__dirname, "../styles"),
        to: "styles"
      }
    ]),
    new DotEnv({ path: path.resolve(__dirname, "../../../.env") })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
