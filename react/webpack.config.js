var HtmlWebpackPlugin = require('html-webpack-plugin');
var S3Uploader = require('webpack-s3-plugin');
var AWS = require('aws-sdk');
const path = require('path');


module.exports = {
  mode: 'development', // dev
  devtool: 'cheap-module-eval-source-map', // dev
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new S3Uploader({
      s3Options: {
	credentials: new AWS.SharedIniFileCredentials({profile: 'default'}),
        region: 'us-east-1'
      },
      s3UploadOptions: {
        Bucket: 'scotty.dance'
      }
    })

  ]
};
