const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/*-------------------------------------------------*/

module.exports = {
  // webpack optimization mode
  mode: "development" === process.env.NODE_ENV ? "development" : "production",

  // entry files
  entry: [
    "./src/index.js", // react
  ],

  // output files and chunks
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "build/[name].js",
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s?css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  // webpack plugins
  plugins: [
    // extract css to external stylesheet file
    new MiniCssExtractPlugin({
      filename: "build/styles/style.css",
    }),

    // prepare HTML file with assets
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      minify: false,
    }),

    // copy static files from `src` to `dist`
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "dist/assets"),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  // resolve files configuration
  resolve: {
    // file extensions
    extensions: [
      "*",
      ".js",
      ".jsx",
      ".css",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".svg",
      ".scss",
    ],
  },

  // webpack optimizations
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        vendor: {
          chunks: "all", // both : consider sync + async chunks for evaluation
          name: "vendor", // name of chunk file
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
  devtool: "source-map",
};
