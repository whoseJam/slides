const {resolve} = require('path')

module.exports = {
  // 设置当前模式为开发
  mode: 'development',
  // 入口文件
  // entry: './index.js',
  output: {
    // 定义输出路径
    path:  resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.$js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}