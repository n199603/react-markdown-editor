const path = require('path')

module.exports = {
  // 最初に読み込むファイル
  entry: './src/index.tsx',
  module: {
    // ビルド時に追加で行う処理
    rules: [
      {
        // .tsxファイルにts-loaderを実行
        // x?→xの有無は任意(.tsに対しても適用する)
        test: /\.tsx?$/,
        use: 'ts-loader',
        // 除外するファイル
        exclude: /node_modules/,
      },
    ],
  },
  // 解決するファイルの拡張子
  resolve: {
    extensions: ['.js','.ts', 'tsx'],
  },
  // 出力するファイル
  output: {
    // distディレクトリに対してindex.jsを出力
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  }
}