import { BangumiCollectionTypeType } from "@/bangumi/api";

export const varToString = (varObj: any) => Object.keys(varObj)[0];

export const enumToString = (enumObj: any, value: any) =>
  Object.keys(enumObj).find((key) => enumObj[key] === value);

export const enumKeys = (enumObj: any) =>
  Object.keys(enumObj).filter((key) => isNaN(Number(key)));

export const toHttps = (url: string) => url.replace(/^http:\/\//i, "https://");

export const toBangumiStatus = (status: string): BangumiCollectionTypeType => {
  if (status === "Not Started") return BangumiCollectionTypeType.Wish;
  else if (status === "In Progress")
    return BangumiCollectionTypeType.InProgress;
  else if (status === "Completed") return BangumiCollectionTypeType.Done;

  // fallback to Wish
  console.warn(`Unknown status: ${status}, fallback to Wish`);
  return BangumiCollectionTypeType.Wish;
};

export * from "./typeMap";
