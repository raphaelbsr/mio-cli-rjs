
<p align="center">
  <a href="https://rocketseat.com.br">
    <img width="256" src="https://datac-mio.s3-sa-east-1.amazonaws.com/LogoMio.png" alt="Logo">
  </a>
  <h3 align="center">MIO CLI RJS</h3>
</p>

- [Tabela de Conteúdo](#tabela-de-conte%c3%bado)
- [ToDo](#todo)
- [Sobre o Projeto](#sobre-o-projeto)
- [Instalação](#instala%c3%a7%c3%a3o)
- [Guia de Uso](#guia-de-uso)
  - [Comandos](#comandos)
    - [Crud - Gera os arquivos necessários para realizar as operações de um CRUD, podendo ser utilizando Redux Store e Sagas](#crud---gera-os-arquivos-necess%c3%a1rios-para-realizar-as-opera%c3%a7%c3%b5es-de-um-crud-podendo-ser-utilizando-redux-store-e-sagas)

## Tabela de Conteúdo

## ToDo

- Documentacão

- Gerar CRUD com opcao de nao gerar o readuxAction e o Saga

- Desacoplar os generators dos comandos

- Tratamentos
  - Perguntar o usuário se deseja sobreescrever o arquivo caso exista;
  - Retornar Erros em vermelho no terminal;
  - Retornar mensagem de sucesso quanto terminar o processamento com sucesso;

- V2 templates customizados pelo próprio usuário

## Sobre o Projeto

O MIO CLI RJS é um programa que fornece ao desenvolvedor de aplicativos MIO comandos para o ajudar na rotina de desenvolvimento.

## Instalação

Para instalar basta executar o seguinte comando

Instale apenas como dependência de desenvolvimento

```sh
// Para instalar com npm
npm install mio-cli-rsj --save-dev

// Para instalar com yarn
yarn add mio-cli-rsj -D
```

## Guia de Uso

Abra o terminal na raíz do projeto e execute os comando <b>miorjs [comando] [parametros]</b>

  ### Comandos

 #### Crud - Gera os arquivos necessários para realizar as operações de um CRUD, podendo ser utilizando Redux Store e Sagas

O comando abaixo irá gerar os seguintes arquivos para realizar um CRUD de pessoa.

```sh
miorjs pessoa
```

```
mio-app
└── src
    ├── pages
    |   └── Pessoa
    |       └── components
    |       |   ├── Form
    |       |   |   └─ index.js
    |       |   └── Table
    |       |       └─ index.js
    |       └── index.js
    └── stores
        |── ducks
        |   └─ pessoa.js
        └── sagas
            └─ pessoa.js
```

O Comando crud aceita que você envie alguns parâmetros

| Parâmetro               | Tipo                        | Descrição                                                                                            |
| ----------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| -f   ou --force         | boolean <b>Padrão: false<b> | Se este parâmetro for informado o comando irá sobrescrever qualquer arquivo existente, tenha cuidado |
| -n   ou --no-redux-saga | boolean <b>Padrão: false<b> | Se este parâmetro for informado o comando não irá gerar o CRUD utilizando o Redux e Saga             |
