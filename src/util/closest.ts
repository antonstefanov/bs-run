type ReadDir = (
  path: string,
  callback: (err: NodeJS.ErrnoException, files: string[]) => void,
) => void;

type GetParentDir = (path: string) => string;

export type Callback = (
  err: NodeJS.ErrnoException | undefined,
  result: string | undefined,
) => void;

export const findClosestFile = (
  dir: string,
  file: string,
  readDir: ReadDir,
  getParentDir: GetParentDir,
  cb: Callback,
) => {
  readDir(dir, (err, items) => {
    if (err) return cb(err, undefined);
    for (const f of items) {
      if (f === file) return cb(undefined, dir);
    }
    if (dir === "/") return cb(undefined, undefined);

    return findClosestFile(getParentDir(dir), file, readDir, getParentDir, cb);
  });
};
