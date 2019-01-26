const uargs = require("../util/args");

const execNodePath = () => uargs.execNodePath(process.argv);
const execFilePath = () => uargs.execFilePath(process.argv);
const cmd = () => uargs.cmd(process.argv);
const args = () => uargs.args(process.argv);

module.exports = {
  execNodePath,
  execFilePath,
  cmd,
  args,
};
