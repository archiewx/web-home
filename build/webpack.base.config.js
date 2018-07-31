const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      public: path.resolve(__dirname, '../public'),
      'config/axios': path.resolve(__dirname, '../src/config/axios.js')
    }
  },
  externals: {
    dayjs: 'dayjs'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                'css-loader?minimize',
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ],
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new UglifyJsPlugin({
          uglifyOptions: {
            ecma: 5,
            warnings: false
          }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [new FriendlyErrorsPlugin()]
}
