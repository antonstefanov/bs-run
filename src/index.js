#!/usr/bin/env node

const path = require("path");

const args = require("./util/args");
const run = require("./node/run");
const shell = require("./node/shell");

const build = async (cwd = ".") =>
  new Promise((resolve, reject) =>
    shell.exec("yarn build", { cwd }, (exn, out, err) => {
      if (exn) {
        console.log(out);
        console.log(err);
        return reject(exn);
      }
      return resolve();
    }),
  );

(async () => {
  const executedFile = args.cmd(process.argv);
  if (executedFile == null) {
    console.error("Must specify which file to execute");
    return;
  }
  const fileInfo = path.parse(executedFile);
  try {
    await build(fileInfo.dir);
  } catch (err) {
    // continue even on fail
  }
  await run.run(executedFile);
  // do more things
})();
