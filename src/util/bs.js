const _isEs = specs => specs["module"] !== "commonjs";
const _inSource = specs => specs["in-source"] === true;

const name = bsConfig => bsConfig["name"];
const specs = bsConfig => bsConfig["package-specs"];
const isEs = bsConfig => _isEs(specs(bsConfig));
const inSource = bsConfig => _inSource(specs(bsConfig));
const suffix = bsConfig => bsConfig["suffix"];

module.exports = {
  name,
  specs,
  isEs,
  inSource,
  suffix,
};
