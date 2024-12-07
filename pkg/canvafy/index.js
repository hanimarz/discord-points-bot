Object.defineProperty(exports, "__esModule", { value: true });
const { registerFont } = require("canvas");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const path = require("path");

const { GlobalFonts } = require('@napi-rs/canvas');

GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Amiri/Amiri-Regular.ttf`,"Amiri")

const { emitWarning } = process;
process.emitWarning = (warning, ...args) => {
  if (args[0] === 'ExperimentalWarning') { return; }
  if (args[0] && typeof args[0] === 'object' && args[0].type === 'ExperimentalWarning') { return; }
  return emitWarning(warning, ...args);
};


module.exports = {
  Image: {
    gay: require("./src/gay")
  },
  Rank: require("./src/rank"),
  Util: require("./plugins/Util"),
  WelcomeLeave: require("./src/welcome-leave"),
  Top: require("./src/top"),
  LevelUp: require("./src/level-up"),
  Profile: require("./src/profile"),
  Instagram: require("./src/instagram"),
  author: "Bes-js",
  version: require("./package.json").version
};