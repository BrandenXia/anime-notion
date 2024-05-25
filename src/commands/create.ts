import properties from "@/notion/properties";
import consola from "consola";
import { NOTION_PAGE_ID } from "@/env";
import { varToString } from "@/utils";
import { notion } from "@/clients";
import { Argument, Command } from "@commander-js/extra-typings";

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

const createCmd = new Command("create")
  .description("Create a new database in Notion")
  .addArgument(new Argument("<parentId>", "The ID of the parent page"))
  .addArgument(
    new Argument("[title]", "The title of the database").default("番剧"),
  )
  .action(async (parentId, title) => await createDb(parentId, title));

export default createCmd;
