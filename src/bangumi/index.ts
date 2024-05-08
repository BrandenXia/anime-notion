import { BANGUMI_TOKEN } from "@/env.ts";
import request, { type RequestOptionFunc } from "./request";
import { addCollection, type EndpointType, search } from "./api";

const bind = <T extends EndpointType>(
  request: Function,
  fn: T,
): RequestOptionFunc<T> =>
  request.bind(null, fn) as unknown as RequestOptionFunc<T>;

class Bangumi {
  private readonly request;

  constructor(token: string) {
    this.request = request.bind(null, token);
  }

  get search(): RequestOptionFunc<typeof search> {
    return bind(this.request, search);
  }

  get addCollection(): RequestOptionFunc<typeof addCollection> {
    return bind(this.request, addCollection);
  }
}

const createBangumiClient = () => new Bangumi(BANGUMI_TOKEN || "");

export default createBangumiClient;
