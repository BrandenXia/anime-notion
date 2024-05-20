import createNotionClient from "@/notion/client.ts";
import createBangumiClient from "@/bangumi";

export const notion = createNotionClient();

export const bangumi = createBangumiClient();
