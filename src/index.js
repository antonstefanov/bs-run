#!/usr/bin/env node

const args = require("./util/args");
const run = require("./node/run");
const path = require("path");

(async () => {
  const executedFile = args.cmd(process.argv);
  if (executedFile == null) {
    console.error("Must specify which file to execute");
    return;
  } else if (
    path.basename(executedFile, path.extname(executedFile)) ===
    "tempCodeRunnerFile"
  ) {
    console.error("Partial code-runner selections are not supported");
    return;
  }
  await run.run(executedFile);
  // do more things
})();
