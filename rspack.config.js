const CopyPlugin = require('copy-webpack-plugin');

/**
 *  @type {import('@rspack/cli').Configuration}
 */
const config = {
  entry: {
    main: '/src/index.jsx', // 配置项目入口文件
  },
  builtins: {
    html: [
      {
        template: 'public/index.html', // 对齐 CRA 生成index.html
      },
    ],
    copy: {
      patterns: [
        {
          from: 'public',
        },
      ],
    },
  },
};
module.exports = config;