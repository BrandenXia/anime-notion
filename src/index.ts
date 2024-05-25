#!/usr/bin/env bun
import createCmd from "@/commands/create";
import importCmd from "@/commands/import";
import addCmd from "@/commands/add";
import { InteractiveCommand } from "interactive-commander";

const program = new InteractiveCommand();

program
  .name("anime-notion")
  .description("A CLI tool to dealing with anime data in Notion")
  .addCommand(createCmd)
  .addCommand(addCmd)
  .addCommand(importCmd);

await program.interactive().parseAsync();
