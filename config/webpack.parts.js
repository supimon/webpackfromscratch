const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // not working as expected
const PurifyCSSPlugin = require("purifycss-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|bmp|gif|jpeg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options
        }
      }
    ]
  }
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: true })]
  }
});

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    // contentBase,
    // watchContentBase,
    open: true,
    overlay: true
    // hot: true
  }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
});

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.extractCSS = ({ include, exclude, use = [] }) => {
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css"
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: [MiniCssExtractPlugin.loader].concat(use)
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()]
  }
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "babel-loader"
      }
    ]
  }
});

exports.page = ({
  filename = "./index.html",
  template = "./src/layouts/homeLayout.pug",
  entry
} = {}) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      filename: filename,
      template
      //chunks: ["initial"] // not working as expected
    })
  ]
});

// exports.clean = path => ({
//   plugins: [new CleanWebpackPlugin()]
// });

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
});
