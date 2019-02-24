type T = string[];

export const execNodePath = (argv: T) => argv[0];
export const execFilePath = (argv: T) => argv[1];
export const cmd = (argv: T) => (argv.length > 2 ? argv[2] : undefined);
export const args = (argv: T, extraArgs = 1) => {
  const sysArgs = extraArgs + 2;
  if (argv.length < sysArgs) {
    return [];
  }
  return argv.slice(sysArgs);
};
