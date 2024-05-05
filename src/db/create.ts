import { Client } from "@notionhq/client";
import properties from "./properties";
import consola from "consola";
import { NOTION_PAGE_ID } from "@/env";
import { varToString } from "@/utils";

const createDb = async (client: Client, parentId: string) => {
  consola.start("Creating database...");

  const db = await client.databases.create({
    parent: {
      type: "page_id",
      page_id: parentId,
    },
    title: [
      {
        type: "text",
        text: { content: "番剧" },
      },
    ],
    properties: properties,
  });

  consola.success("Database created!");
  consola.info(
    `Please add the database id to your .env file:\n${varToString({
      NOTION_PAGE_ID,
    })}=${db.id}`
  );
};

export default createDb;
