import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.(jpg|png|svg|ico|icns)$/,
  loader: "file-loader",
  options: {
    name: "[path][name].[ext]",
    publicPath: "..", // move up from 'main_window'
    context: "src/assets", // set relative working folder to src
  }
});

rules.push({
  test: /\.ico$/,
  type: 'asset',
});


rules.push({
  test: /\.s?css$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
},);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.ico', '.scss', '.sass'],
  },
};
