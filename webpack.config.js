const path = require('path')
const SRC = path.resolve(__dirname, 'node_modules');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // webpack optimization mode
  mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production'),
  // entry files
  entry: [
    './src/index.jsx', // react
  ],

  // output files and chunks
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build/[name].js',
  },
  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.s?css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
      },
    ],
  },
  // webpack plugins
  plugins: [

    /* extract css to external stylesheet file
    new MiniCssExtractPlugin({
      filename: 'build/styles.css',
    }),
    */

    // prepare HTML file with assets
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      minify: false,
    }),

    /* copy static files from `src` to `dist`
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }), */
  ],
  // file extensions
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
  },
  // webpack optimizations
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        vendor: {
          chunks: 'all', // both : consider sync + async chunks for evaluation
          name: 'vendor', // name of chunk file
          test: /node_modules/, // test regular expression
        },
      },
    },
  },
  // development server configuration
  devServer: {
    port: 8088,
    historyApiFallback: true,
  },
  // generate source map
  devtool: 'source-map',
}
