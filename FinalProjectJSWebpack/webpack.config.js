const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: "./public/index.js",
  output: {
    path: resolve(__dirname, "build"),
    filename: "index.js",
    assetModuleFilename: "image/[name][ext][query]",
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  target: "web",
  module: {
    rules: [
      {
        //test: /\.(png|jpg|svg|gif)$/,
        test: /\.(png|svg)/,
        type: "asset/resource",
        // use: ["file-loader", "svg-inline-loader", "url-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./public/index.html"),
    }),
    new HtmlWebpackPlugin({
      template: "./public/single_page.html",
      filename: "single_page.html",
    }),
    new HtmlWebpackPlugin({
      template: "./public/shopping_cart.html",
      filename: "shopping_cart.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
