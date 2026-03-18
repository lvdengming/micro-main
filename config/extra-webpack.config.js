/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-03-13 00:03:03
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-03-18 22:55:20
 */

/** 添加 externals */
const addExternals = (config) => {
  config.externals = {
    ...config.externals,
    'zone.js': 'Zone',
  };
};

/** 添加拆包配置 */
const addSplitChunks = (config) => {
  config.optimization.splitChunks = {
    ...config.optimization.splitChunks,
    automaticNameDelimiter: '-',
    cacheGroups: {
      angular: {
        name: 'angular',
        test: /[\\/]node_modules[\\/]@angular[\\/]/,
        chunks: 'all',
        priority: 20,
      },
      // 如果使用 vendor，则默认会被添加到 index.html 中
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'initial',
        priority: 10,
      },
    },
  };
};

module.exports = (config, options) => {
  addExternals(config);
  addSplitChunks(config);

  return config;
};
