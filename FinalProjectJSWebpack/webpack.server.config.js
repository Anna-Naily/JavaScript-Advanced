const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    server: path.join(__dirname, "server/server.js"),
  },
  output: {
    path: path.join(__dirname, "build/server"),
    publicPath: "/",
    filename: "[name].js",
  },

  target: "node",

  node: {
    global: false,
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  devServer: {
    contentBase: "public",
    proxy: { "*": { target: "http://192.168.1.65:8080/", secure: false } },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "server/db",
          to: "db/[name][ext]",
          toType: "template",
        },
      ],
    }),
  ],
};
