import {
  type BangumiLegacySubjectType,
  type BangumiSubjectType,
  BangumiSubjectTypeType,
  baseUrl,
} from "@/bangumi/api";
import { bangumi } from "@/clients";
import { enumToString, subjectTypeMapper } from "@/utils";
import consola from "consola";
import addToDb from "@/notion/update";
import { Command } from "commander";
import {
  limitOption,
  oldSearchOption,
  statusOption,
  subjectTypeOption,
} from "@/options";

const addItem = async (
  limit: number,
  subjectTypes: BangumiSubjectTypeType[],
  status: "Not Started" | "In Progress" | "Completed",
  oldSearch: boolean,
  item: string,
) => {
  let data: BangumiSubjectType[] | BangumiLegacySubjectType[];

  if (!oldSearch) {
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
    data = res.data;
  } else {
    const res = await bangumi.searchOld({
      pathParam: { keywords: item },
      query: { type: subjectTypes[0] },
    });
    data = res.list;
  }

  const items = data.map((item) => ({
    label: `${item.name} - ${item.name_cn} (${enumToString(BangumiSubjectTypeType, item.type)})`,
    value: item.id.toString(),
  }));
  const values = data.reduce(
    (acc, item) => {
      acc[item.id.toString()] = item;
      return acc;
    },
    {} as Record<string, (typeof data)[number]>,
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
      cover: Object.hasOwn(item, "images")
        ? (item as BangumiLegacySubjectType).images.large
        : `${baseUrl}/v0/subjects/${item.id}/image?type=large`,
    });
  }
};

const addCmd = new Command("add")
  .description("Add items to Notion")
  .addOption(limitOption)
  .addOption(subjectTypeOption)
  .addOption(statusOption)
  .addOption(oldSearchOption)
  .arguments("<item>")
  .action(
    async (item, { limit, subjectType, status, oldSearch }) =>
      await addItem(limit, subjectType, status, oldSearch, item),
  );

export { addItem };
export default addCmd;
