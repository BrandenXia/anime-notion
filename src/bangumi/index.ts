import { BANGUMI_TOKEN } from "@/env.ts";
import { addCollection, baseUrl, search } from "./api";
import { createClient } from "endpoint-ts";

const createBangumiClient = () =>
  createClient(
    {
      baseUrl,
      headers: { Authorization: `Bearer ${BANGUMI_TOKEN}` },
    },
    { addCollection, search },
  );

export default createBangumiClient;
