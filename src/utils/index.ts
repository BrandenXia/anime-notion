export const varToString = (varObj: any) => Object.keys(varObj)[0];

export const enumToString = (enumObj: any, value: any) =>
  Object.keys(enumObj).find((key) => enumObj[key] === value);
