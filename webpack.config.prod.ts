import * as webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import * as path from 'path';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
//  import CompressionPlugin from 'compression-webpack-plugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

// process.traceDeprecation = true;

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.tsx',
  devtool: 'source-map',
  // target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html',
    //   filename: './index.html',
    //   favicon: './public/favicon.ico'
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.DefinePlugin(GLOBALS),
    new Dotenv({
      path: './.env.prod'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
    // initially bundle.js file is 3.7 MB
    // new CompressionPlugin({
    //   // filename: '[path].br[query]',
    //   filename: '[path].gz[query]',
    //   // algorithm: 'brotliCompress',
    //   algorithm: 'gzip',
    //   test: new RegExp('\\.(js|css)$'),
    //   compressionOptions: { level: 11 },
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: false
    // })
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 8000,
      //       name: 'images/[hash]-[name].[ext]'
      //     }
      //   }]
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};

export default config;
