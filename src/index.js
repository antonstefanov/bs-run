#!/usr/bin/env node

const args = require("./util/args");
const run = require("./node/run");

(async () => {
  const executedFile = args.cmd(process.argv);
  await run.run(executedFile);
  // do more things
})();
