import { BANGUMI_TOKEN } from "@/env";
import { addCollection, baseUrl, search, searchOld } from "./api";
import { createClient } from "endpoint-ts";

const createBangumiClient = () =>
  createClient(
    {
      baseUrl,
      headers: { Authorization: `Bearer ${BANGUMI_TOKEN}` },
    },
    { addCollection, search, searchOld },
  );

export default createBangumiClient;
