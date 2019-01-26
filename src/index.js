#!/usr/bin/env node

const path = require("path");

const args = require("./node/args");
const bs = require("./node/bs");

(async () => {
  const executedFile = args.cmd();
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
  const compiledFilename = bs.compiledFileName(
    bsConfig,
    bsConfigPath,
    absoluteExecutedFile,
  );
  if (bs.isEs(bsConfig)) {
    require = require("esm")(module);
  }
  require(compiledFilename);
})();
