#!/usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const { handle: createCrud } = require('./Commands/Crud');

program.version(package.version);

program
  .command('crud [name]')
  .description('Criar um CRUD')
  .option(
    '--no-redux-saga',
    'Não insere as ações do redux e nem os efeitos do saga'
  )
  .option(
    '-f, --force [boolean]',
    'Força a execução do comando sobreescrevendo algum arquivo existente',
    false
  )
  .action(async (name, options) => {
    await createCrud(name, options);
  });

program.parse(process.argv);
