import consola from "consola";
import { NOTION_PAGE_ID } from "@/env";
import { notion } from "@/clients";
import { baseUrl } from "@/bangumi/api";

const addToDb = async ({
  id,
  name,
  status,
  type,
}: {
  id: number;
  name: string;
  status: "Not Started" | "In Progress" | "Completed";
  type: "Anime" | "Comic" | "Light Novel" | "Visual Novel";
}) => {
  consola.info(`Adding ${name} to database`);

  await notion.pages.create({
    parent: { database_id: NOTION_PAGE_ID },
    cover: {
      type: "external",
      external: {
        url: `${baseUrl}/v0/subjects/${id}/image?type=large`,
      },
    },
    properties: {
      Name: { title: [{ type: "text", text: { content: name } }] },
      Status: { select: { name: status } },
      Type: { select: { name: type } },
      Id: { number: id },
    },
  });

  consola.success(`Added ${name} to database`);
};

export default addToDb;
