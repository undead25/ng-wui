// Karma configuration
// Generated on Tue Jan 03 2017 14:04:56 GMT+0800 (中国标准时间)


module.exports = function (config) {
  const testWebpackConfig = require('./config/webpack.test.js');

  const configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: './config/spec-bundle.js', watched: false }
    ],
    exclude: [
      'node_modules/**/*spec.js'
    ],
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
    webpack: testWebpackConfig,

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
  }
  
  config.set(configuration);
}
