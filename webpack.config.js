'use strict';

module.exports = {
  mode:               'production',
  entry:              './src/main.ts',
  devtool:            'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [ { loader: 'ts-loader' } ]
      },
      // All output '' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
    ]
  },
  target:             'node',
  output: {
    libraryTarget:    'commonjs2',
    path:             `${__dirname}/dist/`,
    filename:         'main.cjs.js',
  },
  optimization: {
    minimize:         false,
    usedExports:      true,
  },
};
