#!/usr/bin/env node

const program = require("commander");
const package = require("../package.json");
const { handle: createCrud } = require("./Commands/Crud");

program.version(package.version);

program
  .command("crud [name]")
  .description("Criar um CRUD")
  .option("-a, --action [action]", "Cria a action do readux")
  .option("-s, --saga [saga]", "Cria a saga")
  .action((name, options) => {
    createCrud({ name, options });
  });

program.parse(process.argv);
