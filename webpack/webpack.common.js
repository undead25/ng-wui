
const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'); 

module.exports = {
  // 入口
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: {
    'polyfills': './src/demo/polyfills.ts',
    'vendor': './src/demo/vendor.ts',
    'main': './src/demo/main.ts'
  },
  // 解析模块
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    // 需要进行模块解析的后缀名 (数组)
    // https://webpack.js.org/configuration/resolve/#resolve-extensions
    extensions: ['.ts', '.js', '.json']
  },
  // 模块配置
  // https://webpack.js.org/configuration/module/
  module: {
    rules: [
      // 处理ts
      // https://github.com/s-panferov/awesome-typescript-loader
      // https://github.com/TheLarkInn/angular2-template-loader
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      // 处理sass
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader!sass-loader'
        })
      },
      // 处理css
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader:'style-loader',
          loader: 'css-loader'
        })
      },
      // 处理html
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/demo/index.html')]
      }
    ]
  },
  // 自定义node环境用于polyfills或者mocks
  // https://webpack.js.org/configuration/node/
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  // 插件
  // https://webpack.js.org/configuration/plugins/#plugins
  plugins: [
    // 提取每个页面的公共代码
    // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // https://github.com/webpack/docs/wiki/optimization#multi-page-app
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    // 让html里面引入js defer 
    // https://github.com/numical/script-ext-html-webpack-plugin
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    // 为webpack bundles创建htm文件
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'src/demo/index.html',
      chunksSortMode: 'dependency',
      inject: 'head'
    }),

    // 为Angular2 使用`System.import` 提供context，不使用会报waring
    // https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin, https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // src目录
    ),

    // 让ts检查用独立的进程，提高webpack打包速度
    // 一个用于把 TypeScript 代码转译成 ES5 的加载器，它会由 tsconfig.json 文件提供指导
    // https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
    new ForkCheckerPlugin(),

    new ExtractTextPlugin('style.css')
  ]
}
