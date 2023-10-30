import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
  use: [
    {
      loader: 'file-loader',
    }
  ]
},);

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
