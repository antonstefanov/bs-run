const findClosestFile = (dir, file, readDir, getParentDir, cb) => {
  readDir(dir, (err, items) => {
    if (err) return cb(err);
    for (const f of items) {
      if (f === file) return cb(undefined, dir);
    }
    if (dir === "/") return cb(undefined, undefined);

    return findClosestFile(getParentDir(dir), file, readDir, getParentDir, cb);
  });
};

module.exports = {
  findClosestFile,
};
