import consola from "consola";
import { NOTION_PAGE_ID } from "@/env";
import { notion } from "@/clients";

const addToDb = async (
  {
    id,
    name,
    status,
    type,
    synced,
  }: {
    id: number;
    name: string;
    status: "Not Started" | "In Progress" | "Completed";
    type: "Anime" | "Comic" | "Light Novel" | "Visual Novel";
    synced: boolean;
  },
) => {
  consola.info(`Adding ${name} to database`);

  await notion.pages.create({
    parent: { database_id: NOTION_PAGE_ID },
    properties: {
      Name: { title: [{ type: "text", text: { content: name } }] },
      Status: { select: { name: status } },
      Type: { select: { name: type } },
      Synced: { checkbox: synced },
      Id: { number: id },
    },
  })

  consola.success(`Added ${name} to database`);
};

export default addToDb;
