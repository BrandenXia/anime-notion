#!/usr/bin/env bun
import { Command } from "@commander-js/extra-typings";
import createCmd from "@/commands/create";
import importCmd from "@/commands/import";
import addCmd from "@/commands/add";
import consola from "consola";

const program = new Command();

program
  .name("anime-notion")
  .description("A CLI tool to dealing with anime data in Notion")
  .addCommand(createCmd)
  .addCommand(addCmd)
  .addCommand(importCmd)
;

try {
  program.parse();
} catch (error) {
  consola.error(`Exit with error: ${error}`);
}
