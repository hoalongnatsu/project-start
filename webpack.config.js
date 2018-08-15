const path= require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin= require('html-webpack-plugin');
const webpack = require('webpack');

require('dotenv').config();

module.exports = {
   entry: ['babel-polyfill', './src/js/index.js'],
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/index.js' 
   },
   devServer: {
      contentBase: './dist'
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './src/index.html'
      }),
      new webpack.DefinePlugin({
         NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
      new MiniCssExtractPlugin({
         filename: "css/[name].css",
      })
   ],
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            }
         },
         {
            test: /\.css$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
               },
               "css-loader"
            ]
         }
      ]
   }
};