export const promisify = <V, E>(
  resolve: (result: V | Promise<V>) => void,
  reject: (error: E) => void,
) => (err: E | undefined, result: V) => {
  if (err) return reject(err);
  return resolve(result);
};
