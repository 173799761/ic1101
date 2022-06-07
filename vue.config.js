const path = require('path');
const webpack = require('webpack')
function resolve(dir) {
  // __dirname项目根目录的绝对路径
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  publicPath: './',
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
        })
    ]
  }
}
