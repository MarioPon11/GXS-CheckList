import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// eslint-disable-next-line import/default
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: path.join("src", "assets"), to: "assets" }
    ]
  }),
];
