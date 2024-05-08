export type StrMap = Record<string, unknown>;

export type EndpointType<
  ResBody extends StrMap = StrMap,
  PathParam extends StrMap = StrMap,
  QueryParam extends StrMap = StrMap,
  ReqBody extends StrMap = StrMap,
> = [method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", path: string];

export const baseUrl = "https://api.bgm.tv";

enum BangumiSubjectTypeType {
  Book = 1,
  Anime,
  Music,
  Game,
  Real = 6,
}

enum BangumiCollectionTypeType {
  Wish = 1,
  Collect,
  Do,
  OnHold,
  Dropped,
}

type BangumiSubjectType = {
  id: number;
  url: string;
  type: BangumiSubjectTypeType;
  name: string;
  name_cn: string;
  summary: string;
  air_date: string;
  air_weekday: number;
  images: {
    large: string;
    common: string;
    medium: string;
    small: string;
    grid: string;
  };
};

export const search: EndpointType<
  { results: number; list: BangumiSubjectType[] },
  { keywords: string },
  { type: BangumiSubjectTypeType }
> = ["GET", "/search/subject/{keywords}"];

export const addCollection: EndpointType<
  {},
  { subject_id: number },
  {},
  { type: BangumiCollectionTypeType }
> = ["POST", "/v0/users/-/collections/{subject_id}"];
