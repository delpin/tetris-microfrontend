const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = (_, argv) => ({
  output: {
    publicPath: argv.mode === 'development' ? "http://localhost:3000/" : "https://tetris-microfrontend-home.vercel.app/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    preferAbsolute: true,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    mainFiles: ['index'],
    alias: {}
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
        tetris: argv.mode === 'development' ? "tetris@http://localhost:3000/remoteEntry.js" : "tetris@https://tetris-microfrontend-react.vercel.app/remoteEntry.js",
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"]
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
});
