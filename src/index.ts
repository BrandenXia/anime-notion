#!/usr/bin/env bun
import { Argument, Command } from "commander";

const program = new Command();

program
  .name("anime-notion")
  .description("A CLI tool to dealing with anime data in Notion");

program
  .command("create")
  .description("Create a new database in Notion")
  .addArgument(new Argument("<parentId>", "The ID of the parent page"))
  .addArgument(
    new Argument("[title]", "The title of the database").default("番剧"),
  )
  .action(async (parentId, title) => {
    const { default: createDb } = await import("@/commands/create.ts");

    await createDb(parentId, title);
  });

program
  .command("import")
  .description("Import data to Notion")
  .addArgument(
    new Argument("<type>", "The type of data to import").choices(["text"]),
  )
  .addArgument(new Argument("<file>", "The file to import"))
  .action(async (type, file) => {
    const { default: importToDb } = await import("@/commands/import.ts");

    await importToDb(type, file);
  });

program.parse();
