const merge = require("webpack-merge");
const parts = require("./config/webpack.parts");
const pagesArr = require("./config/pages");

const commonConfig = merge([
  {
    entry: {
      vendor: ["./src/vendor.js", "./src/vendor.scss"]
    }
  },
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
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS()
]);

module.exports = mode => {
  const pages = pagesArr;
  // const pages = [
  //   parts.page({
  //     filename: "./component1page/component1page.html",
  //     template: "./src/pages/component1page/component1page.pug",
  //     entry: {
  //       "./component1Page/component1Page": [
  //         "./src/pages/component1page/component1page.js",
  //         "./src/pages/component1page/component1page.scss"
  //       ]
  //     }
  //   }),
  //   parts.page({
  //     filename: "./component2page/component2page.html",
  //     template: "./src/pages/component2page/component2page.pug",
  //     entry: {
  //       "./component2Page/component2Page": [
  //         "./src/pages/component2page/component2page.js",
  //         "./src/pages/component2page/component2page.scss"
  //       ]
  //     }
  //   })
  // ];
  const config = mode === "production" ? productionConfig : developmentConfig;

  return pages.map(page => merge(commonConfig, config, page, { mode }));
};
