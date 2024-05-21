import createNotionClient from "@/notion/client";
import createBangumiClient from "@/bangumi";

export const notion = createNotionClient();

export const bangumi = createBangumiClient();
