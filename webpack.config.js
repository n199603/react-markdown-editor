const path = require('path')

module.exports = {
  // 最初に読み込むファイル
  entry: './src/index.ts',
  module: {
    // ビルド時に追加で行う処理
    rules: [
      {
        // .tsファイルにts-loaderを実行
        test: /\.ts$/,
        use: 'ts-loader',
        // 除外するファイル
        exclude: /node_modules/,
      },
    ],
  },
  // 解決するファイルの拡張子
  resolve: {
    extensions: ['.ts'],
  },
  // 出力するファイル
  output: {
    // distディレクトリに対してindex.jsを出力
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  }
}