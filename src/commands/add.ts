import { BangumiSubjectTypeType } from "@/bangumi/api";
import { bangumi } from "@/clients";
import { enumToString, subjectTypeMapper } from "@/utils";
import consola from "consola";
import addToDb from "@/notion/update";
import { Command } from "commander";
import { limitOption, statusOption, subjectTypeOption } from "@/options";

const addItem = async (
  limit: number,
  subjectTypes: BangumiSubjectTypeType[],
  status: "Not Started" | "In Progress" | "Completed",
  item: string,
) => {
  const res = await bangumi.search({
    body: {
      keyword: item,
      filter: {
        type: subjectTypes.length > 0 ? subjectTypes : undefined,
        nsfw: true,
      },
    },
    query: { limit },
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
      status: status,
      type: await subjectTypeMapper(item.type),
    });
  }
};

const addCmd = new Command("add")
  .description("Add items to Notion")
  .addOption(limitOption)
  .addOption(subjectTypeOption)
  .addOption(statusOption)
  .arguments("<item>")
  .action(
    async (item, { limit, subjectType, status }) =>
      await addItem(limit, subjectType, status, item),
  );

export { addItem };
export default addCmd;
