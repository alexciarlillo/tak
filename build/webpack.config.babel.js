import merge from 'webpack-merge';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackOptimizedConfig from './webpack.config.optimize';
import webpackWatchConfig from './webpack.config.watch';
import addHotMiddleware from './util/addHotMiddleware';
import config from './config';

const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';

let webpackConfig = {
  context: config.paths.src,
  entry: config.entry,
  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
  output: {
    path: config.paths.dist,
    publicPath: config.publicPath,
    filename: `scripts/${assetsFilenames}.js`,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js?|vue)$/,
        include: config.paths.src,
        use: [{
          loader: 'eslint-loader',
        }],
      },

      {
        test: /\.js$/,
        exclude: [/(node_modules)(?![/|\\](bootstrap|jquery))/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015'],
            ],
          },
        }],
      },
      {
        test: /\.vue$/,
        include: config.paths.src,
        use: [
          { loader: 'vue-loader' },
        ],
      },
      {
        test: /\.css$/,
        include: config.paths.src,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
            { loader: 'postcss-loader' },
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: config.paths.src,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
            { loader: 'postcss-loader' },
            { loader: 'resolve-url-loader', options: { sourceMap: config.enabled.sourceMaps } },
            { loader: 'sass-loader', options: { sourceMap: config.enabled.sourceMaps } },
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        include: config.paths.src,
        use: [
          { loader: 'file-loader', options: { name: `[path]${assetsFilenames}.[ext]` } },
        ],
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
        include: /node_modules/,
        use: [
          { loader: 'file-loader', options: { name: `vendor/${assetsFilenames}.[ext]` } },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      config.paths.src,
      'node_modules',
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.vue', '.json'],
    enforceExtension: false,
  },
  plugins: [
    new CleanPlugin([config.paths.dist], {
      root: config.paths.root,
      verbose: false,
    }),
    new CopyPlugin([
      {
        from: config.copy,
        to: `[path]${assetsFilenames}.[ext]`,
      },
    ]),
    new ExtractTextPlugin({
      filename: `styles/${assetsFilenames}.css`,
      disable: (config.enabled.watcher),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: config.enabled.optimize,
      debug: config.enabled.watcher,
      stats: { colors: true },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        output: { path: config.paths.dist },
        context: config.paths.src,
        postcss: [
          autoprefixer({ browsers: config.browsers }),
        ],
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: { failOnWarning: false, failOnError: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};

if (config.enabled.optimize) {
  webpackConfig = merge(webpackConfig, webpackOptimizedConfig);
}

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.watcher) {
  webpackConfig.entry = addHotMiddleware(webpackConfig.entry);
  webpackConfig = merge(webpackConfig, webpackWatchConfig);
}

export default webpackConfig;
