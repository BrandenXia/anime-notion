import { Client } from "@notionhq/client";
import { NOTION_TOKEN } from "@/env.ts";

const createNotionClient = () => new Client({ auth: NOTION_TOKEN });

export default createNotionClient;
