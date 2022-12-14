const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file. DONE
// TODO: Add CSS loaders and babel to webpack. DONE

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    //Plugins
    //HTMLwebpack must come before pwamanifest
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Just Another Text Editor',
        template: './index.html',
        favicon: './favicon.ico',
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js',
      }),

      //Create Manifest.json DONE
      new WebpackPwaManifest({
        //TODO
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Text Editor PWA',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        orientation: 'portrait',
        display: 'standalone',
        start_url: './',
        publicPath: './',
        fingerprints: false,
        // Apple specific meta tags inserted with the following two lines
        inject: true,
        ios: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('images'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
          // Makes it so the generated images don't have a random filename
          generator: {
            filename: 'images/[name][ext]',
          },
        },
      ],
    },
  };
};
