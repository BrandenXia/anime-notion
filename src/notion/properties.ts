import type { CreateDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

type Properties = NonNullable<
  CreateDatabaseParameters["initial_data_source"]
>["properties"];

const properties: Properties = {
  Name: { title: {} },
  Status: {
    select: {
      options: [
        { name: "Not Started", color: "red" },
        { name: "In Progress", color: "blue" },
        { name: "Completed", color: "green" },
      ],
    },
  },
  Type: {
    select: {
      options: [
        { name: "Anime", color: "green" },
        { name: "Comic", color: "blue" },
        { name: "Light Novel", color: "purple" },
        { name: "Visual Novel", color: "red" },
      ],
    },
  },
  Id: { number: {} },
};

export default properties;
