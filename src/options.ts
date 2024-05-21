import { Option } from "commander";
import { enumKeys } from "@/utils";
import { BangumiSubjectTypeType } from "@/bangumi/api.ts";

export const subjectTypeOption = new Option(
  "-s, --subject-type [subjectTypes...]",
  "The types of subject(s)",
)
  .choices(enumKeys(BangumiSubjectTypeType))
  .default([], "All types")
  .argParser((val, prev) =>
    (prev as BangumiSubjectTypeType[]).concat(
      BangumiSubjectTypeType[val as keyof typeof BangumiSubjectTypeType],
    ),
  );

export const limitOption = new Option(
  "-l, --limit [limit]",
  "The limit of items to import",
)
  .default(15)
  .argParser((val) => parseInt(val, 10));
