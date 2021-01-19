# Web制作シンプル開発環境構築

## 概要


### 目的
Node.jsベースの
HTML+CSS+JavaScriptのシンプルな開発環境を作る

### なぜシンプルな開発環境を作るのか

- 案件が確定するまでに余計なカロリーを使わないで済む
- CMSに依存しない保守性の高い開発ができるようになる
- VueやReactなどのフレームワークに依存しない開発力を身につける
- Node関連のプラグインのアップデートや停止などに振り回されない力を身につける
- 引き継ぎのことを考えられる作りにするための訓練になる

## 最低限環境の導入

- node.js ＆　yarnの導入(特に理由がなければ最新版でOK（安定版があれば安定版で）)
- webpack＆babelの導入
- scssの導入
- pugの導入（任意 htmlで書く人は入れなくてよい）

### nodejs + yarn　を導入

Windowsであればインストーラー
Macであればbrewなどで導入してください。

導入までは特になにもないので省略

```bash
yarn init
```

上記のコマンドでpackage.jsonなどを自動生成
node.jsをやっていくうえでの初期化コマンドみたいなもの。

### webpack＆babelの導入

```bash
yarn add -D webpack@4.46.0 webpack-cli babel-loader @babel/core @babel/preset-env
```

webpackは現状5.15.0ですが、バグなのかホットリロードが効かないので明示的に４の最新バージョンを入れています。

5にするメリットを今のところあんまり感じられないので一旦４で大丈夫です。
スキルアップとして５にしてホットリロードを動かせたらスキルアップにもつながると思うので暇があったらチャレンジしてみてください。


インストールが終わるとpackage.jsonの中身はこうなっている

```json
{
  "name": "webdev_standard",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "babel-loader": "^8.2.2",
    "webpack": "^4.46.0",
    "webpack-cli": "^4.3.1"
  }
}
```



ここに実行するスクリプトを記述しておく

```json
{
  "name": "webdev_standard",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack",
    "serve": "webpack serve"
  },
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "babel-loader": "^8.2.2",
    "webpack": "^5.15.0",
    "webpack-cli": "^4.3.1"
  }
}
```

記述する場所はどこでもいいが、よくわからなかったらlicenseの後に記述すればOK

buildはそのまんまの意味でブラウザが理解できるようにwebpackがビルドしてくれるコマンド。

serveは後に説明する保存したら自動的にビルドしてくれる機能を動かす時に使うもの。一旦無視でOK


#### webpackの設定

webpackを使うにはルート(package.jsonがあるディレクトリ)に

webpack.config.js

というファイルを自分で作成して記述してく。

```js
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
      }
    ]
  },
};
```

webpackについての解説は各自ググってください。

簡単に説明するとやっていることは

- modeは開発モードにする
- entryはwebpackビルドの起点となるファイルの場所を指定
- outputはビルド後似出力されるディレクトリを指定
- モジュールを色々設定（今回はルールの1つとしてbabel-loaderを使ってjsをトランスパイルするという感じの設定）

webpackの書き方については正直慣れるしかない。

最初のうちは解説サイトなどのコピペでOK。
ルールやモジュールを追加したくなった時に調べるぐらいの勢いで大丈夫。

すべてを詳細に解説してくれてるサイトもあるので気になったときが覚え時。

babelについてもとりあえずこういう感じに使うもんなんだと思っておけばOK。

TypeScriptだとBabelは不必要だが今回はJSを使うのでBabelを採用。

#### 起点ファイルの作成

次に起点となるファイルを作成しましょう。

webpack.config.jsに記述したとおり

/src/main.js

を作成します。

ルートにsrcフォルダを作成してその中にmain.jsを作ればOK。

ファイルの中身は一旦

```js
console.log("hello node js");
```

とでも記述しておいてください。

基本的に開発していくファイルはすべてsrcの中にいれていく。

吐き出すdistディレクトリは自動的に作成されるため、基本は自分で作らなくてもよし。
（コンパイル後distディレクトリがないから生成出来ないと言われたら作ればOK）

#### ビルドできるかチェック

ここまで来たら最低限jsをトランスパイルしてES5の形に直してくれる形が完成。

```bash
yarn run build
```

コマンドを打ってちょっとしたら完了します。

ここまででエラーが出たら何か間違ってるので
エラーを見ながら何がダメなのかを解決してください。

#### nodeでビルドしたファイルを読み込んで見る

ビルドが問題なく完成したら/dist/main.jsが出来上がっています。

```bash
node ./dist/main/js

hello node js
```

main.jsに記述したconsole.logが表示されたら問題なくビルドできてます。

dist側のmain.jsの中身を見てもらうと、何やらいろんなコメントや見慣れない書き方をしてるコードが生成されています。

基本的に出力後のコードは気にしないでそのままjavascriptファイルとしてアップするような形になります。

最近の新しいJavaScriptの書き方はいわゆるES6とか言われたりします。
ES2015とかES2016とかES6とか色々ややこしい言い回しがあるので

- ES5は古い書き方(ブラウザが理解できる書き方)
- ES6以上は新しい書き方

って覚えておいたらOKです。

何が違うのか簡単に説明すると、ES5じゃないとブラウザによっては動いてくれない感じです。
ES5はいろんな主要ブラウザで動くけど書き方が冗長だったりJavaScriptの悪いところを詰め込んだようなコードになります。

一方ES6は面倒くさい書き方をしなくてもJavaScriptをかけるようになった記法です。

一部ブラウザでは動くらしいですが、現時点でエンドユーザーが使う主要ブラウザでは
ES6で書いたコードは動かないと思っておいたほうがいいです。

動かすにはnode.jsを土台として動かす（ようはnode.jsサーバーを立ててその上でES6のコードを動かす）か
今回やっているWebpackでbabelを使ってES5にトランスパイルしてやる必要があります。

Webpackを使わずbabel単体でもいけますが、SCSSやPUGなどと併用する場合、
babel単品でやるよりもWebpackで1活でまとめてやるのがいいから基本的にはWebpackとセットですね。

#### node.js豆知識
-D はDevelopの略
正直自分だけが使う場合は-Dをつけようがあまり気にしないでOK
githubとかにあげたり本番環境開発環境を分けて誰かに渡したいとかなら

基本的にデプロイ後でも使うものは -D をつけずにインストール。

webpackやらbabelやらコンパイルだけして吐き出した後には別に必要じゃないものは
-Dをつけて開発中に必要なものとしてpackage.jsonの中身を切り分ける

間違ってやってしまったら後でpackage.jsonを編集すればいい


### SCSSの導入

LessでもSASSでもscssでも好きなのを入れて構いませんが、
scssが幅広く使われているのでとりあえずscssにしました。

個人的には昔の技術を使うよりも新しい技術を使って行くべきだと思うので
最近流行りだしてる「Stylus」を使っています。

Stylusの内容はscssでもLessのいいところどりをしているようなCSSトランスパイルプラグインです。

とまぁ、今回は別にそこまで最新は必要でもないので
scssをcssに変換してくれたらそれでよしなので簡単にいきます。

```bash
yarn add -D style-loader css-loader sass-loader sass mini-css-extract-plugin
```

loader系は基本的にWebpackで使います。

style-loaderは今回は使いませんが、jsにcssを一緒にバンドルしたい場合は
直後に言及してるmini-scss-extra-pluginと置き換えてください。

https://haniwaman.com/webpack-sass/
上がわかりやすいです。
興味があったらみてください。

話を戻しますと、今回mini-css-extract-pluginはcssファイルに切り分けるために使います。
javascriptファイルにインラインとして埋め込むこともできますが、
規模が大きくなるとJSファイルが肥大化する上に分業する場合、
CSSとJSでファイルを切り分けているほうが何かと円滑に進むので今回は切り分けて行く予定です。


```js
// プラグインを読みこむ
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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


      // 追加分

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
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      ignoreOrder: true,
    })
  ],
};
```

これでwebpackでビルドすると
main.jsの吐き出しとCSSの吐き出しをしてくれるようになります。

一旦簡易的にSCSSファイルを作ってみます。
/src/scss/styles.scss

でファイルを作ってください。

```scss
body {
    h1 {
        color:#f00;
        span {
            font-size:3rem;
        }
    }
    h2 {
        color:#00f;
    }
}
```

最後に、起点となっているmain.jsにscssをインポートしてからビルドすると
jsファイルとcssファイルの吐き出しが成功します。

```js
import './scss/styles.scss';

console.log("hello node js");
```

逆に読み込みたくないscssがある場合、インポートしなければいいので
main.jsではstyles.scssをインポートしておいて
その他の切り分けたscssの管理は「styles.scss」側のインポートで調整していきます。

### pugの導入

pugはvueをつかったりReactを使う場合変に噛ますと面倒くさいけど
特定のフレームワークをつかうと相性が悪かったりするけど一応導入しておきます。

```bash
yarn add -D pug pug-loader html-webpack-plugin
```

これもまたwebpack.config.jsに記述していきます。

pugはかなりシンプルです。

長いのでその他は省略します。
ルールに以下を埋め込んでください。

```js
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
```

次に「html-webpack-plugin」を使ってpugの読み込み設定をします。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin') // htmlを生成するのに必要

~~~省略~~~

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
```

最後にpugファイルを作りましょう。

scssと同じ感じで

/src/pug/index.pug

としてファイルを作成します。

```pug
html
    head
        meta(charset="utf8")
        link(rel="stylesheet", href="./css/style.css")
    
    body
        h1
            | シンプル
            span Web
            | 開発環境

        h2 すべての土台となる環境
```

これでbuildするとdist直下にindex.htmlが生成されています。

index.htmlをWebブラウザで読み込んでCSSが問題なく動いていて
なおかつコンソールログがwebdevelopperツールで表示されていればOKです。

### Autoprefixの設定

基本的なのはここまでで完了ですが、このままだとブラウザ別にCSSを書く必要があるため
そんな面倒くさいことは基本的にやらないようにしたいです。

autoprefixを設定すると設定した範囲で各ブラウザ別にCSSが吐き出されるようになります。

例えばtransform関連のCSSはChromeやSafariだと「-webkit-transform」等ベンダープレフィックスを記述しないといけないですが
autoprefixを使うと「transform」のCSS１つ記述するとそれぞれのベンダープレフィックスを自動的に書き出してくれます。

早速導入していきます。

```bash
yarn add -D autoprefixer postcss-loader
```

autoprefixerを読み込むためにpostcss-loaderというものが必要になります。

postcssというのはいわゆる進化したCSSの書き方です。
SCSSやLESSの次に注目されるものだと言われてましたが意外と人気がでずでした。
postcssはそのうちまた進化すると思いますが、最近はSCSSとLessのいいとこ取りをしたStylusが幅を利かせています。

ではwebpackに設定を書きます。

```js
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
```

変更点はsassの部分だけです。
css-loaderとsass-loaderの間に設定を割り込ませます。

動きとしては逆から動いているので、sassでcssにコンパイルした後
postcssでベンダープレフィックスを付与したものをcssとして書き出すといった感じの流れになってます。

autoprefixer自体はgulpやらpostcssを経由しないと動かないやつなので
今回はpostcss-loaderを介して使っている感じになります。

設定の「grid:true」や「flexbox:true」はお好みです。

基本flexbox:trueだけでもいいですが、今後gridのcssも普及してくると思うので一旦true。

これでcssにベンダープレフィックスが付与されたものが出力されますが、このままだとわからないので
とりあえずベンダープレフィックスが必要なCSSを適当に書いてみてビルドしてみましょう。

```scss
body {
    h1 {
        color:#f00;
        span {
            font-size:3rem;
            transform:rotate(45);
            transition:.5s font-size linear;
        }
    }
    h2 {
        color:#00f;
    }
    
}
```

transformとtransitionを意味もなくつけてみました。

そして最後にpackage.jsonに設定を加えないとベンダープレフィックス出力をしてくれないので気をつけてください。

```json
{
  "name": "webdev_standard",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack",
    "serve": "webpack serve"
  },
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "autoprefixer": "^10.2.1",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.0.1",
    "html-webpack-plugin": "^4.5.1",
    "mini-css-extract-plugin": "^1.3.4",
    "postcss-loader": "^4.1.0",
    "pug": "^3.0.0",
    "pug-loader": "^2.4.0",
    "sass": "^1.32.4",
    "sass-loader": "^10.1.1",
    "style-loader": "^2.0.0",
    "webpack": "^4.46.0",
    "webpack-cli": "^4.3.1"
  },
  "browserslist": [
    "last 2 version",
    "> 5%",
    "ie >= 9"
  ]
}

```

最後に追加した

browserslist

の部分ですね。

どこまでのブラウザを対象とするかの設定ができます。
本来はwebpack.config.jsに書くのですが、postcssのプラグインを無理やりつかってるのもあり
こっちで設定しないと動かないという感じです。

これでビルドして吐き出し先のファイルをみて-webkit-なりついてたらOKです。

### 保存時に自動コンパイルする設定

このままだと毎回ビルドコマンドを打って吐き出されるまで待たないといけないのが面倒だし
時間もかかるので保存後自動的にビルドしてくれる環境を作ります。

```bash
yarn add -D webpack-dev-server
```

次にpackage.jsonのscriptsに以下を加えます。

```json
"serve": "webpack serve"
```

次にwebpack.config.jsonに仮想サーバーの設定を行います。

```js
  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    open: true,
    port: 3000,
  },

```

pluginsの後にカンマで区切って設定を挿入します。

コマンドは 設定したとおり「yarn run serve」になります。
この辺のコマンドはお好みでOK

わからなかったらそのままでOK



## HTML+CSS+JavaScriptの開発環境が完成

ここまでで以下の機能が実装された開発環境が整いました。

- pugコンパイル
- scssコンパイル
- ES6以上のコンパイル
- CSSのベンダープレフィックスの自動付与
- ファイル保存時に自動で更新してくれる機能

### この構成を作るメリット

簡単な案件のコーディング（例えば特に機能のない公式サイトを作ったり）するときに効果を発揮します。

ここにjQueryを追加してもいいですし、非Jqueryプラグインを詰め込んでいくサイトを作ることも出来ます。

やろうと思えばここから自作のHedlessCMSを作ったりも可能です。

Vue Cliとかを使うと一発で構築デキるような環境は便利で早いですが、
こうやって１つ１つ自分で組み込んでいくことにより何が動いているのかを理解できるようになります。

コピペして決まったコマンドを打って動かすだけなら今どきの小学生でもできます。
