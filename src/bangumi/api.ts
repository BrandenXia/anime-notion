import type { Endpoint } from "endpoint-ts";

export const baseUrl = "https://api.bgm.tv";

export enum BangumiSubjectTypeType {
  Book = 1,
  Anime,
  Music,
  Game,
  Real = 6,
}

export enum BangumiCollectionTypeType {
  Wish = 1,
  Collect,
  Done,
  OnHold,
  Dropped,
}

export type BangumiSubjectType = {
  id: number;
  type: BangumiSubjectTypeType;
  name: string;
  name_cn: string;
  summary: string;
  image: string;
  tags: { name: string; count: number }[];
  score: number;
  rank: number;
};

export const search: Endpoint<{
  body: {
    keyword: string;
    filter?: {
      type?: BangumiSubjectTypeType[];
    };
  };
  response: {
    total: number;
    limit: number;
    offset: number;
    data: BangumiSubjectType[];
  };
  query: { limit?: number; offset?: number };
}> = ["POST", "/v0/search/subjects"];

export const addCollection: Endpoint<{
  pathParam: { subject_id: number };
  body: { type: BangumiCollectionTypeType };
}> = ["POST", "/v0/users/-/collections/{subject_id}"];
