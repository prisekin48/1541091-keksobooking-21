const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/map.js`,
    `./js/pin.js`,
    `./js/form.js`,
    `./js/main-pin.js`,
    `./js/card.js`,
    `./js/backend.js`,
    `./js/filters.js`,
    `./js/main.js`,
    `./js/files.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
