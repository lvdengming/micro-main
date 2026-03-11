const { mergeWithCustomize, customizeObject } = require('webpack-merge');

module.exports = (config, options) => {
  const customOptions = {
    customObject: customizeObject({
      'optimization.splitChunks.cacheGroups': 'merge',
    }),
  };

  const splitChunksConfig = {
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '-',
        cacheGroups: {
          angular: {
            name: 'angular',
            test: /[\\/]node_modules[\\/]@angular[\\/]/,
            chunks: 'initial',
            priority: 50,
          },
        },
      },
    },
  };

  return mergeWithCustomize(customOptions)(config, splitChunksConfig);
};
