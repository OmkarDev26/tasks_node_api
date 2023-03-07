const path = require("path");

module.exports = {
  entry: "./app.js",

  output: {
    path: path.resolve(__dirname, "dist"),

    filename: "api.bundle.js",
  },
  mode: "development",
  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },

  target: "node",
};
