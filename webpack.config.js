// プラグインを読みこむ
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin') // htmlを生成するのに必要
const autoprefixer = require('autoprefixer');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `${__dirname}/src/main.js`,

  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
        ]
      },
      // pugファイルの読み込みとコンパイル
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },

      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    grid: true,
                    flexbox: true,
                  })
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/pug/index.pug", // 入力ファイル名
        // inject: false, //バンドルしたjsファイルを読み込むscriptタグを自動出力しない
        minify: false, //minifyしない
        hash: true,
        scriptLoading:"defer",
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      ignoreOrder: true,
    })
  ],
  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    open: true,
    port: 3000,
  },
};