import { Client } from "@notionhq/client";
import { NOTION_TOKEN } from "@/env";

const createClient = () => new Client({ auth: NOTION_TOKEN });

export default createClient;
