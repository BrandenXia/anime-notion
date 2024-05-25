import { Option } from "@commander-js/extra-typings";
import { enumKeys } from "@/utils";
import { BangumiSubjectTypeType } from "@/bangumi/api";

export const subjectTypeOption = new Option(
  "-s, --subject-type <subjectTypes...>",
  "The types of subject(s)",
)
  .choices(enumKeys(BangumiSubjectTypeType))
  .default([], "All types")
  .argParser((val, prev: BangumiSubjectTypeType[]) =>
    (prev).concat(
      BangumiSubjectTypeType[val as keyof typeof BangumiSubjectTypeType],
    ) as BangumiSubjectTypeType[],
  );

export const limitOption = new Option(
  "-l, --limit <limit>",
  "The limit of items to import",
)
  .default(15)
  .argParser((val) => parseInt(val));

export const statusOption = new Option(
  "-t, --status <status>",
  "The status of the item",
)
  .default("Not Started" as const)
  .choices(["Not Started", "In Progress", "Completed"] as const);

export const oldSearchOption = new Option(
  "-o, --old-search",
  "Use the old search API, note that the old API doesn't support searching with multiple subject types, only the first type passed will be used",
).default(false);
