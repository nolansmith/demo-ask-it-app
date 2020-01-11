const webpack = require("webpack");
const html = require("html-webpack-plugin");
const clean = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const buildDir = path.resolve(__dirname, "../../../build");
const WebpackBar = require("webpackbar");
const DotEnv = require("dotenv-webpack");

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, "../index.js")
  },
  node: { fs: "empty" },
  target: "web",
  output: {
    path: buildDir,
    publicPath: "/",
    filename: "[contenthash].webapp.js",
    chunkFilename: "[name].[contenthash].js"
  },
  plugins: [
    new html({
      template: path.resolve(__dirname, "../index.html")
    }),
    new clean(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../images"),
        to: "images"
      },
      {
        from: path.resolve(__dirname, "../styles"),
        to: "styles"
      },
      {
        from: path.resolve(__dirname, "../fonts"),
        to: "fonts"
      }
    ]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new WebpackBar(),
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
