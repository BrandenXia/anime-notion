export const varToString = (varObj: any) => Object.keys(varObj)[0];

export const isEmpty = (obj: any) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
