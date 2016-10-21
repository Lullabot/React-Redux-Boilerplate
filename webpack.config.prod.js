const path = require('path');
const webpack = require('webpack');
const postcssInlineComment = require('postcss-inline-comment');
const postcssNested = require('postcss-nested');
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBPACK: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', 'assets'),
        to: path.resolve(__dirname, 'public', 'assets')
      }
    ]),
    new ExtractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
        include: path.resolve(__dirname, '/')
      }
    ]
  },
  postcss: function() {
    return [postcssImport, postcssVars, postcssNested, postcssInlineComment, autoprefixer, csswring];
  }
};
