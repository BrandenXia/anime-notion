import consola from "consola";
import { bangumi } from "@/clients";
import addToDb from "@/notion/update";
import { enumToString } from "@/utils";
import { BangumiSubjectTypeType } from "@/bangumi/api";
import { Argument, Command } from "commander";
import { limitOption, subjectTypeOption } from "@/options.ts";

const addItem = async (
  limit: number,
  subjectTypes: BangumiSubjectTypeType[],
  item: string,
) => {
  const res = await bangumi.search({
    body: {
      keyword: item,
      filter: { type: subjectTypes.length > 0 ? subjectTypes : undefined },
    },
    query: { limit: limit },
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

  const ans = (await consola.prompt("Select items to add:", {
    required: false,
    type: "multiselect",
    options: items,
  })) as unknown as string[];

  const itemsToAdd = ans.map((item) => values[item]);

  consola.info(
    `Adding items: ${itemsToAdd.map((item) => item.name).join(", ")}`,
  );

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

const importText = async (
  add: (item: string) => Promise<void>,
  path: string,
) => {
  consola.info(`Importing text data from file: ${path}`);

  const file = await Bun.file(path).text();

  const items = file.split("\n").filter((item) => item.trim() !== "");

  for (const item of items) {
    await add(item);
  }
};

const importToDb = async (
  type: "text",
  path: string,
  limit: number,
  subjectTypes: BangumiSubjectTypeType[],
) => {
  const add = addItem.bind(null, limit).bind(null, subjectTypes);

  switch (type) {
    case "text":
      await importText(add, path);
      break;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

const importCmd = new Command("import")
  .description("Import data to Notion")
  .addArgument(
    new Argument("<type>", "The type of data to import").choices(["text"]),
  )
  .addArgument(new Argument("<file>", "The file to import"))
  .addOption(limitOption)
  .addOption(subjectTypeOption)
  .action(
    async (type, file, options) =>
      await importToDb(type, file, options.limit, options.subjectType),
  );

export default importCmd;
