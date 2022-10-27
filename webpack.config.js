const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

const path = require("path");
module.exports = {
  target: "node",
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  entry: { main: "./index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new NodePolyfillPlugin(), new Dotenv()],
};
