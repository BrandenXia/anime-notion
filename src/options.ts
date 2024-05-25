import { enumKeys } from "@/utils";
import { BangumiSubjectTypeType } from "@/bangumi/api";
import { InteractiveOption } from "interactive-commander";
import consola from "consola";

export const subjectTypeOption = new InteractiveOption(
  "-s, --subject-type <subjectTypes...>",
  "The types of subject(s)",
)
  .choices(enumKeys(BangumiSubjectTypeType))
  .default([], "All types")
  .argParser(
    (val, prev: BangumiSubjectTypeType[]) =>
      prev.concat(
        BangumiSubjectTypeType[val as keyof typeof BangumiSubjectTypeType],
      ) as BangumiSubjectTypeType[],
  )
  .prompt(async () => {
    return (
      await consola.prompt("Select the type of subject(s)", {
        type: "multiselect",
        options: enumKeys(BangumiSubjectTypeType),
      })
    ).map(
      (val) =>
        BangumiSubjectTypeType[val as keyof typeof BangumiSubjectTypeType],
    );
  });

export const limitOption = new InteractiveOption(
  "-l, --limit <limit>",
  "The limit of items to import",
)
  .default(15)
  .argParser((val) => parseInt(val));

export const statusOption = new InteractiveOption(
  "-t, --status <status>",
  "The status of the item",
)
  .default("Not Started" as const)
  .choices(["Not Started", "In Progress", "Completed"] as const);

export const oldSearchOption = new InteractiveOption(
  "-o, --old-search",
  "Use the old search API, note that the old API doesn't support searching with multiple subject types, only the first type passed will be used",
).default(false);
