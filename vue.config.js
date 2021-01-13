/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 15:37:40
 * @LastEditTime: 2021-01-13 16:46:04
 * @LastEditors: @Xin (834529118@qq.com)
 */
const path = require('path')
function resolve (dir) {
  return path.resolve(__dirname, dir)
}

const development = process.env.NODE_ENV === 'development'

module.exports = {
  productionSourceMap: development,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('packages'),
        'assets': resolve('examples/assets'),
        'views': resolve('examples/views'),
      }
    },
    output: {
      libraryExport: 'default'
    }
  },
  css: {
    extract: false,
  },
  devServer:{
    port: 9090,
    hot: true,
    open: 'Google Chrome'
  }
}
