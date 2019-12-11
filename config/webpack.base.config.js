const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(process.env.NODE_ENV)

let _resolve = dir => path.resolve(__dirname, '../', dir);

module.exports = {
  entry: {
    index: [_resolve('./lib/index.js')],
  },
  output: {
    path: _resolve('dist'),
    filename: '[name].js',
    library: 'rcHookForm',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  externals: ['react', 'async-validator'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
        ]
      },
      {
        test: /\.(jpg|jpeg|bmp|svg|png|webp|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name].[hash:8].[ext]',

        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[name]--[hash:base64:5]'
              },
            }
          },
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
};
