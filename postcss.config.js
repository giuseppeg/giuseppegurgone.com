const read = require("util").promisify(require("fs").readFile);
module.exports = {
  plugins: [
    [
      "postcss-easy-import",
      {
        load: (filename) => read(filename, "utf8"),
        onImport: function () {},
      },
    ],
    "postcss-custom-media",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
  ],
};
