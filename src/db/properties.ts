import type { CreateDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

const properties: CreateDatabaseParameters["properties"] = {
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
};

export default properties;
