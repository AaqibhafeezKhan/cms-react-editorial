const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:9001/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cmsReactEditorial",
      filename: "remoteEntry.js",
      exposes: {
        "./PageEditor": "./src/PageEditor",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: 9001,
    historyApiFallback: true,
  },
};
