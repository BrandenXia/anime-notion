import consola from "consola";
import { bangumi } from "@/clients.ts";
import addToDb from "@/notion/update.ts";
import { enumToString } from "@/utils";
import { BangumiSubjectTypeType } from "@/bangumi/api.ts";

const addItem = async (item: string) => {
  const res = await bangumi.search({
    body: { keyword: item },
    query: { limit: 15 },
  });

  const items = res.data.map((item) => ({
    label: `${item.name} - ${item.name_cn} (${enumToString(BangumiSubjectTypeType, item.type)})`,
    value: item.id.toString(),
  }));
  const values = res.data.reduce(
    (acc, item) => {
      acc[item.id.toString()] = item;
      return acc;
    },
    {} as Record<string, (typeof res.data)[number]>,
  );

  const ans = await consola.prompt("Select items to add:", {
    required: false,
    type: "multiselect",
    options: items,
  }) as unknown as string[];

  const itemsToAdd = ans.map((item) => values[item]);

  consola.info(`Adding items: ${itemsToAdd.map((item) => item.name).join(", ")}`);

  for (const item of itemsToAdd) {
    await addToDb({
      id: item.id,
      name: item.name,
      status: "Completed",
      type: "Anime",
      synced: false,
    });
  }
};

const importText = async (path: string) => {
  consola.info(`Importing text data from file: ${path}`);

  const file = await Bun.file(path).text();

  const items = file.split("\n").filter((item) => item.trim() !== "");

  for (const item of items) {
    await addItem(item);
  }
};

const importToDb = async (type: "text", path: string) => {
  switch (type) {
    case "text":
      await importText(path);
      break;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

export default importToDb;
