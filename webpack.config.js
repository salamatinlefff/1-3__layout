const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


let mode = 'development';


if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

function isProd(prod, dev) {
  return (mode === 'production' ? prod : dev);
}

module.exports = {
  mode: mode,
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: isProd('[name].[contenthash].js', '[name].js'),
    assetModuleFilename: 'assets/[contenthash][ext][query]',
    clean: true,
  },
  devServer: {
    open: true,
    static: {
      directory: path.resolve(__dirname, 'src'),
      watch: true,
    },
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: isProd('[name].[contenthash].css', '[name].css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          isProd(MiniCssExtractPlugin.loader, 'style-loader'),
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|awif|ico)$/i,
        type: isProd('asset/resource', 'asset/inline'),
        generator: isProd({ filename: 'assets/img/[hash][ext][query]' }, {}),
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
