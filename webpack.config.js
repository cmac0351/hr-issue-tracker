const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname + '/client/src/index.js'),
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle-[contenthash].bundle.js',
    clean: true
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.scss$/,
        use:[
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: __dirname + '/client/src/template.html',
    }),
  ]
}