var path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
var SRC_DIR = path.join(__dirname, '/react-client/src');
// var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: {
    'react-client/dist/bundle.js': `${SRC_DIR}/entryCSR.jsx`,
    'react-client/templates/bundle.js': `${SRC_DIR}/entrySSR.jsx`
  },
  output: {
    filename: '[name]',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react']
        }
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'axios': 'axios',
    'jquery': 'jQuery'
  },
  plugins: [new CompressionPlugin()]
};
