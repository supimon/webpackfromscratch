const merge = require("webpack-merge");
const parts = require("./config/webpack.parts");
const pagesArr = require("./config/pages");
const path = require("path");
const glob = require("glob-all");
const SassLintPlugin = require("sass-lint-webpack");

const PATHS = {
  app: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

const commonConfig = merge([
  {
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: ["pug-loader"]
        }
      ]
    }
  },
  parts.loadJavaScript(),
  {
    plugins: [new SassLintPlugin()]
  }
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix(), "sass-loader"]
  }),
  parts.purifyCSS({
    paths: glob.sync(
      [`${PATHS.app}/pages/**/*.js`, `${PATHS.app}/pages/**/*.pug`],
      {
        nodir: true
      }
    )
    // ,minimize: true
  }),
  {
    optimization: {
      splitChunks: {
        chunks: "initial"
      }
    }
  },
  // parts.clean() // not working as expected
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[ext]"
    }
  }),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true
    }
  })
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
    // contentBase: "./dist",
    // watchContentBase: true
  }),
  parts.loadCSS(),
  parts.loadImages()
]);

module.exports = mode => {
  const pages = pagesArr;
  const config = mode === "production" ? productionConfig : developmentConfig;

  return pages.map(page => merge(commonConfig, config, page, { mode }));
};
