var path = require('path');
var WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
  entry: "./src/entries/dist.js",
  plugins: [
    new WebpackAutoInject()
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "controls.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src/scripts"),
          path.resolve(__dirname, "src/entries")
        ],
        loader: 'babel'
      }
    ]
  }
};