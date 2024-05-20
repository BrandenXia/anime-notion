import properties from "../notion/properties.ts";
import consola from "consola";
import { NOTION_PAGE_ID } from "@/env.ts";
import { varToString } from "@/utils";
import { notion } from "@/clients.ts";

const createDb = async (parentId: string, title: string) => {
  consola.start("Creating database...");

  const db = await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: parentId,
    },
    icon: {
      type: "external",
      external: { url: "https://www.notion.so/icons/tv_blue.svg" },
    },
    title: [{ type: "text", text: { content: title } }],
    properties: properties,
  });

  const envMsg = `${varToString({ NOTION_PAGE_ID })}="${db.id}"`;

  consola.success("Database created!");
  consola.info(`Please add the database id to your .env file:\n${envMsg}`);
  consola.info(`Command line:\necho '${envMsg}' >> .env`);
};

export default createDb;
