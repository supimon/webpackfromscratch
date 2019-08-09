const parts = require("./webpack.parts");

const pagesArr = ["component1Page", "component2Page"];

module.exports = pagesArr.map(s =>
  parts.page(
    new Object({
      filename: "./" + s + "/" + s + ".html",
      template: "./src/pages/" + s + "/" + s + ".pug",
      entry: {
        ["./" + s + "/" + s]: [
          "./src/pages/" + s + "/" + s + ".js",
          "./src/pages/" + s + "/" + s + ".scss"
        ]
      }
    })
  )
);
