const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    } )
  ]
};


module.exports = [
  merge(config, {
    entry: {
      'vue-rs-tabs': path.resolve(__dirname + '/src/index.js'),
      'vue-rs-tabs.min': path.resolve(__dirname + '/src/index.js')
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      library: 'vue-rs-tabs',
    }
  })
];