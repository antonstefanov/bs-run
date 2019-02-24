import * as path from "path";

import * as bs from "../util/bs";
import * as fs from "./fs";

export const readConfigAsync = (configPath: string) =>
  fs.readJsoncAsync(configPath);

export const closestBsConfigPathAsync = async (dir: string) => {
  const closestBsConfigDir = await fs.findClosestFileAsync(
    dir,
    "bsconfig.json",
  );
  if (closestBsConfigDir == null) return closestBsConfigDir;

  return path.join(closestBsConfigDir, "bsconfig.json");
};

const getSourceFilePath = (
  baseDir: string,
  filePath: string,
  suffix: string,
  es6: boolean,
) => {
  const fileInfo = path.parse(filePath);
  const pathFromBase = fileInfo.dir.replace(baseDir, "");
  const location = path.join(baseDir, "lib", es6 ? "es6" : "js", pathFromBase);
  return `${location}/${fileInfo.name}${suffix}`;
};

const getInSourceFilePath = (filePath: string, suffix: string) => {
  const fileInfo = path.parse(filePath);
  return `${fileInfo.dir}/${fileInfo.name}${suffix}`;
};

export const compiledFileName = (
  bsConfig: bs.T,
  bsConfigPath: string,
  filePath: string,
) => {
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

export const name = bs.name;
export const isEs = bs.isEs;
