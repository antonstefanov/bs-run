const execNodePath = argv => argv[0];
const execFilePath = argv => argv[1];
const cmd = argv => (argv.length > 2 ? argv[2] : undefined);
const args = (argv, extraArgs = 1) => {
  const sysArgs = extraArgs + 2;
  if (argv.length < sysArgs) {
    return [];
  }
  return argv.slice(sysArgs);
};

module.exports = {
  execNodePath,
  execFilePath,
  cmd,
  args,
};
