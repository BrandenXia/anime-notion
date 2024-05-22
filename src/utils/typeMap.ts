import { BangumiSubjectTypeType } from "@/bangumi/api";
import consola from "consola";

const subjectTypeMapper = async (type: BangumiSubjectTypeType) => {
  switch (type) {
    case BangumiSubjectTypeType.Anime:
      return "Anime";
    case BangumiSubjectTypeType.Book:
      return await consola.prompt("Is this comic or light novel?", {
        type: "select",
        options: ["Comic", "Light Novel"],
      }) as "Comic" | "Light Novel";
    case BangumiSubjectTypeType.Game:
      return "Visual Novel";
    default:
      throw new Error("Unknown type");
  }
};

export { subjectTypeMapper };
