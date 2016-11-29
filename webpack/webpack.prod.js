
const webpack = require('webpack');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  // 怎样生成sourcemap
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // 输出文件
  // https://webpack.js.org/configuration/output/
  output: {
    path: helpers.root('dist'),  // 文件输出的绝对路径
    filename: '[name].[chunkhash].bundle.js',  // 每个bundle名字 [name]代表入口的名字
    sourceMapFilename: '[name].[chunkhash].bundle.map', // sourcemap文件的名字，必须和devtool一起来使用
    chunkFilename: '[id].[chunkhash].chunk.js' // 按需加载的chunk文件名称
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: {keep_fnames: true}
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
})