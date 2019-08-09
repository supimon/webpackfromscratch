const merge = require("webpack-merge");
const parts = require("./config/webpack.parts");
const pagesArr = require("./config/pages");

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
  parts.loadJavaScript()
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix(), "sass-loader"]
  }),
  {
    optimization: {
      splitChunks: {
        chunks: "initial"
      }
    }
  }
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS()
]);

module.exports = mode => {
  const pages = pagesArr;
  const config = mode === "production" ? productionConfig : developmentConfig;

  return pages.map(page => merge(commonConfig, config, page, { mode }));
};
