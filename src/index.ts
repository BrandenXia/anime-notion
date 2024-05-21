#!/usr/bin/env bun
import { Command } from "commander";
import createCmd from "@/commands/create";
import importCmd from "@/commands/import";

const program = new Command();

program
  .name("anime-notion")
  .description("A CLI tool to dealing with anime data in Notion")
  .addCommand(createCmd)
  .addCommand(importCmd);

program.parse();
