interface Specs {
  "in-source": boolean;
  module: "commonjs" | "es6";
}
export interface T {
  name: string;
  "package-specs": Specs;
  suffix: string;
}

const _isEs = (specs: Specs) => specs["module"] !== "commonjs";
const _inSource = (specs: Specs) => specs["in-source"] === true;

export const name = (bsConfig: T) => bsConfig["name"];
export const specs = (bsConfig: T) => bsConfig["package-specs"];
export const isEs = (bsConfig: T) => _isEs(specs(bsConfig));
export const inSource = (bsConfig: T) => _inSource(specs(bsConfig));
export const suffix = (bsConfig: T) => bsConfig["suffix"];
