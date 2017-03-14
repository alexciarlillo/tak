import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import cssnano from 'cssnano';

import config from './config';

export default {
  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        autoprefixer: { browsers: config.browsers },
      },
      canPrint: true,
    }),
  ],
};
