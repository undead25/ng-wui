
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');  // https://github.com/survivejs/webpack-merge
const ExtractTextPlugin = require('extract-text-webpack-plugin');  // https://github.com/webpack/extract-text-webpack-plugin
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
// https://github.com/geowarin/friendly-errors-webpack-plugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = webpackMerge(commonConfig, {
  // 怎样生成sourcemap
  // https://webpack.js.org/configuration/devtool/
  devtool: 'cheap-module-source-map',

  // 输出文件
  output: {
    path: helpers.root('dist'),  // 文件输出的绝对路径
    filename: '[name].bundle.js',  // 每个bundle名字 [name]代表入口的名字
    sourceMapFilename: '[name].map', // sourcemap文件的名字，必须和devtool一起来使用
    chunkFilename: '[id].chunk.js' // 按需加载的chunk文件名称
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [helpers.root('src', 'components/style')]
      },
    ]
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ],

  // webpack 开发服务器配置
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    historyApiFallback: true,
    compress: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    contentBase: helpers.root('src'),
    watchContentBase: true
  }
})
