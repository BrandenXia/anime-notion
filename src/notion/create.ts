import { Client } from "@notionhq/client";
import properties from "./properties.ts";
import consola from "consola";
import { NOTION_PAGE_ID } from "@/env.ts";
import { varToString } from "@/utils";

const createDb = async (client: Client, parentId: string) => {
  consola.start("Creating database...");

  const db = await client.databases.create({
    parent: {
      type: "page_id",
      page_id: parentId,
    },
    icon: {
      type: "external",
      external: { url: "https://www.notion.so/icons/tv_blue.svg" },
    },
    title: [{ type: "text", text: { content: "番剧" } }],
    properties: properties,
  });

  const envMsg = `${varToString({ NOTION_PAGE_ID })}="${db.id}"`;

  consola.success("Database created!");
  consola.info(`Please add the database id to your .env file:\n${envMsg}`);
  consola.info(`Command line:\necho '${envMsg}' >> .env`);
};

export default createDb;
