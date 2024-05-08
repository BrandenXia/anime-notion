import { baseUrl, type EndpointType, type StrMap } from "./api.ts";
import { isEmpty } from "@/utils";

export type RequestOptionFunc<E extends EndpointType> = (options: {
  pathParam: E extends EndpointType<infer _, infer P> ? P : never;
  queryParam?: E extends EndpointType<infer _, infer _, infer Q> ? Q : never;
  reqBody: E extends EndpointType<infer _, infer _, infer _, infer B>
    ? B
    : never;
}) => Promise<E extends EndpointType<infer R> ? R : never>;

type RequestType = <
  ResBody extends StrMap,
  PathParam extends StrMap,
  QueryParam extends StrMap,
  ReqBody extends StrMap,
>(
  token: string,
  endpoint: EndpointType<ResBody, PathParam, QueryParam, ReqBody>,
  options: {
    pathParam: PathParam;
    queryParam?: QueryParam;
    reqBody: ReqBody;
  },
) => Promise<ResBody>;

const request: RequestType = async (
  token,
  endpoint,
  { pathParam, queryParam, reqBody },
) => {
  const [method, path] = endpoint;

  const url = new URL(path, baseUrl);

  for (const [key, value] of Object.entries(pathParam))
    url.pathname = url.pathname.replace(`%7B${key}%7D`, value as string);

  if (queryParam)
    for (const [key, value] of Object.entries(queryParam))
      url.searchParams.append(key, value as string);

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: isEmpty(reqBody) ? undefined : JSON.stringify(reqBody),
  });

  return await response.json();
};

export default request;
