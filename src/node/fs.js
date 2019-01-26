const fs = require("fs");
const closest = require("../util/closest");
const path = require("path");

const findClosestFileAsync = (dir, file) =>
  new Promise((resolve, reject) => {
    closest.findClosestFile(
      dir,
      file,
      fs.readdir,
      path.dirname,
      (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      },
    );
  });

const readFileAsync = filePath =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, { encoding: "utf8" }, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    }),
  );

const readJsonAsync = async filePath => {
  const contents = await readFileAsync(filePath);
  return JSON.parse(contents);
};

const COMMENTS_REGEX = /^ *\/\//;
const isCommentsLine = line => COMMENTS_REGEX.test(line);

const readJsoncAsync = async filePath => {
  const contents = await readFileAsync(filePath);
  const contentsNoComments = [...contents.split("\n")].reduce((acc, line) => {
    if (isCommentsLine(line)) {
      return acc;
    } else {
      acc.push(line);
      return acc;
    }
  }, []);
  return JSON.parse(contentsNoComments.join(""));
};

module.exports = {
  findClosestFileAsync,
  readFileAsync,
  readJsonAsync,
  readJsoncAsync,
};
