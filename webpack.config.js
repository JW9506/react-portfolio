const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin")
const webpack = require("webpack")
const path = require("path")
const publicURLRoot = "/"
const SPATitle = "Demo"

module.exports = (_, { mode = "production" }) => {
  const isProduction = mode === "production"
  const isDevelopment = !isProduction
  const commonCSSLoaders = [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    "postcss-loader",
  ]
  const config = {
    mode,
    entry: "./src/js/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[hash:10].js",
      publicPath: publicURLRoot,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.css$/i,
              use: [...commonCSSLoaders],
            },
            {
              test: /\.less$/i,
              use: [...commonCSSLoaders, "less-loader"],
            },
            {
              test: /\.scss$/i,
              use: [
                ...commonCSSLoaders,
                "sass-loader",
                {
                  loader: "sass-resources-loader",
                  options: {
                    resources: ["src/css/global.scss"],
                  },
                },
              ],
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: "url-loader",
              options: {
                limit: 8 * 1024,
                name: "[contenthash:10].[ext]",
                outputPath: "imgs",
                publicPath: `${publicURLRoot}/imgs`.replace(/\/\//g, "/"),
              },
            },
            {
              test: /\.(j|t)sx?$/i,
              exclude: /node_modules/,
              loader: "babel-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        title: SPATitle,
        minify: {
          removeComments: isProduction,
          collapseWhitespace: isProduction,
        },
        favicon: "src/favicon.ico",
      }),
      isProduction &&
        new MiniCssExtractPlugin({ filename: "css/main.[contenthash:10].css" }),
      isProduction && new OptimizeCssAssetsPlugin(),
      isProduction &&
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "dll/manifest.json"),
        }),
      isProduction &&
        new AddAssetHtmlPlugin({
          filepath: path.resolve(__dirname, "dll/react.js"),
          hash: true,
          outputPath: "js",
          publicPath: `${publicURLRoot}/js`.replace(/\/\//g, "/"),
        }),
    ].filter(Boolean),
    devServer: {
      compress: true,
      hot: true,
      contentBase: path.resolve(__dirname, "public"),
      historyApiFallback: true,
    },
    performance: {
      assetFilter(assetFilename) {
        return assetFilename.endsWith(".js")
      },
    },
    devtool: isProduction ? "source-map" : "source-map",
  }
  return config
}
