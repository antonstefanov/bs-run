const path = require("path");

const bs = require("../util/bs");
const fs = require("./fs");

const readConfigAsync = configPath => fs.readJsoncAsync(configPath);

const closestBsConfigPathAsync = async dir => {
  const closestBsConfigDir = await fs.findClosestFileAsync(
    dir,
    "bsconfig.json",
  );
  if (closestBsConfigDir == null) return closestBsConfigDir;

  return path.join(closestBsConfigDir, "bsconfig.json");
};

const getSourceFilePath = (baseDir, filePath, suffix, es6) => {
  const fileInfo = path.parse(filePath);
  const pathFromBase = fileInfo.dir.replace(baseDir, "");
  const location = path.join(baseDir, "lib", es6 ? "es6" : "js", pathFromBase);
  return `${location}/${fileInfo.name}${suffix}`;
};

const getInSourceFilePath = (filePath, suffix) => {
  const fileInfo = path.parse(filePath);
  return `${fileInfo.dir}/${fileInfo.name}${suffix}`;
};

const compiledFileName = (bsConfig, bsConfigPath, filePath) => {
  if (bs.inSource(bsConfig)) {
    return getInSourceFilePath(filePath, bs.suffix(bsConfig));
  }
  return getSourceFilePath(
    path.dirname(bsConfigPath),
    filePath,
    bs.suffix(bsConfig),
    bs.isEs(bsConfig),
  );
};

module.exports = {
  closestBsConfigPathAsync,
  readConfigAsync,
  compiledFileName,
  name: bs.name,
  isEs: bs.isEs,
};
