import * as path from "path";

import * as bs from "./bs";

export const getInfo = async (executedFile: string) => {
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

export const executeFile = async (fileName: string, isEs: boolean) => {
  if (isEs) {
    require = require("esm")(module);
  }
  require(fileName);
};

export const run = async (executedFile: string) => {
  const { bsConfig, compiledFileName } = await getInfo(executedFile);
  return executeFile(compiledFileName, bs.isEs(bsConfig));
};
