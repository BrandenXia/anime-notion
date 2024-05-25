import consola from "consola";
import { BangumiSubjectTypeType } from "@/bangumi/api";
import { Argument } from "@commander-js/extra-typings";
import { limitOption, oldSearchOption, subjectTypeOption } from "@/options";
import { addItem } from "@/commands/add";
import { InteractiveCommand } from "interactive-commander";

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
  oldSearch: boolean,
) => {
  const add = addItem
    .bind(null, limit)
    .bind(null, subjectTypes)
    .bind(null, "Completed")
    .bind(null, oldSearch);

  switch (type) {
    case "text":
      await importText(add, path);
      break;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

const importCmd = new InteractiveCommand("import")
  .description("Import data to Notion")
  .addArgument(
    new Argument("<type>", "The type of data to import").choices(["text"] as const),
  )
  .addArgument(new Argument("<file>", "The file to import"))
  .addOption(limitOption)
  .addOption(subjectTypeOption)
  .addOption(oldSearchOption)
  .action(
    async (type, file, { limit, subjectType, oldSearch }) =>
      await importToDb(type, file, limit, subjectType, oldSearch),
  );

export default importCmd;
