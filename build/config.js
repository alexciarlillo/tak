import path from 'path';
import {uniq} from 'lodash';
import merge from 'webpack-merge';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const isProduction = !!((argv.env && argv.env.production) || argv.p);
const rootPath = process.cwd();

let config = {
    entry: {
      main: [
        "./app/main.js",
        "./styles/main.scss",
      ],
    },
    paths: {
      root: rootPath,
      src: path.join(rootPath, 'src'),
      dist: path.join(rootPath, 'dist'),
    },
    enabled: {
      sourceMaps: !isProduction,
      optimize: isProduction,
      cacheBusting: isProduction,
      watcher: !!argv.watch,
    },
    copy: 'assets/**/*',
    devUrl: 'http://localhost:8080',
    proxyUrl: 'http://localhost:3000',
    cacheBusting: '[name]_[hash]',
    watch: [],
    browsers: [
      "last 2 versions",
      "android 4",
      "opera 12",
    ],
};

config.watch.push(`${path.basename(config.paths.src)}/${config.htdocs}`);
config.watch.push(`${path.basename(config.paths.src)}/${config.copy}`);
config.watch = uniq(config.watch);

export default merge(config, {
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
  publicPath: '/',
});
