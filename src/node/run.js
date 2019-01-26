const bs = require("./bs");
const path = require("path");

const getInfo = async executedFile => {
  if (executedFile == null) {
    throw new Error("Must specify which file to execute");
  }
  const absoluteExecutedFile = path.resolve(__dirname, executedFile);
  const fileInfo = path.parse(absoluteExecutedFile);
  const bsConfigPath = await bs.closestBsConfigPathAsync(fileInfo.dir);
  if (bsConfigPath == null) {
    throw new Error(
      `Could not find a bsconfig file close to ${absoluteExecutedFile}`,
    );
  }
  const bsConfig = await bs.readConfigAsync(bsConfigPath);
  const compiledFileName = bs.compiledFileName(
    bsConfig,
    bsConfigPath,
    absoluteExecutedFile,
  );
  return {
    bsConfig,
    compiledFileName,
  };
};

const executeFile = async (fileName, isEs) => {
  if (isEs) {
    require = require("esm")(module);
  }
  require(fileName);
};

const run = async executedFile => {
  const { bsConfig, compiledFileName } = await getInfo(executedFile);
  return executeFile(compiledFileName, bs.isEs(bsConfig));
};

module.exports = {
  getInfo,
  executeFile,
  run,
};
