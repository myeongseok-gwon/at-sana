// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // 앱의 진입점
  entry: './src/index.js',
  // 번들 파일 및 출력 디렉토리 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // newtab.html에서 로드될 번들 파일
    clean: true, // 이전 빌드 파일 삭제
  },
  module: {
    rules: [
      {
        // .js 또는 .jsx 파일에 Babel 로더 적용
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',   // 최신 자바스크립트 문법 변환
              '@babel/preset-react'  // JSX 문법 변환
            ],
          },
        },
      },
      {
        // CSS 파일 처리
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // import 시 확장자 자동 해석
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // public/newtab.html 파일을 템플릿으로 사용하여 newtab.html 생성
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './public/newtab.html',
      filename: 'newtab.html',
      inject: 'body', // 번들 스크립트를 </body> 태그 앞에 삽입
    }),
    // manifest.json, newtab.css, 그리고 background.js를 dist 폴더로 복사
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/newtab.css', to: 'newtab.css' },
        { from: 'public/background.js', to: 'background.js' } // 추가된 부분
      ],
    }),
  ],
  // 개발 서버 설정 (빌드 후 http://localhost:3000 에서 미리보기 가능)
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    open: false,
  },
};
