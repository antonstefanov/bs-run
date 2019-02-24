import * as fs from "fs";
import * as path from "path";

import * as closest from "../util/closest";
import { promisify } from "./util";

export const findClosestFileAsync = (
  dir: string,
  file: string,
): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    closest.findClosestFile(
      dir,
      file,
      fs.readdir,
      path.dirname,
      promisify(resolve, reject),
    );
  });

export const readFileAsync = (filePath: string): Promise<string> =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, { encoding: "utf8" }, promisify(resolve, reject)),
  );

export const readJsonAsync = async (filePath: string) => {
  const contents = await readFileAsync(filePath);
  return JSON.parse(contents);
};

const COMMENTS_REGEX = /^ *\/\//;
const isCommentsLine = (line: string) => COMMENTS_REGEX.test(line);

export const readJsoncAsync = async (filePath: string) => {
  const contents = await readFileAsync(filePath);
  const contentsNoComments = [...contents.split("\n")].reduce(
    (acc: string[], line: string) => {
      if (isCommentsLine(line)) {
        return acc;
      } else {
        acc.push(line);
        return acc;
      }
    },
    [],
  );
  return JSON.parse(contentsNoComments.join(""));
};
