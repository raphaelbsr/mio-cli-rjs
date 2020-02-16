import { upperFirst, camelCase, toLower } from 'lodash';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {
  writeFile,
  fileExists,
  readTemplateFile,
  renderTemplate
} from '../../Commons';

const templatesConfigs = {
  page: {
    getTemplateFilePath: () => {
      return path.join(
        __dirname,
        '../../Templates/Page',
        `index-with-redux.mustache`
      );
    },
    getFilePath: params => {
      const { upperFirstCamelCaseName } = params;
      return path.join(process.cwd(), 'src', 'pages', upperFirstCamelCaseName);
    },
    getFileName: params => {
      return 'index.js';
    }
  },
  form: {
    getTemplateFilePath: () => {
      return path.join(
        __dirname,
        '../../Templates/Page',
        `form-with-redux.mustache`
      );
    },
    getFilePath: params => {
      const { upperFirstCamelCaseName } = params;
      return path.join(
        process.cwd(),
        'src',
        'pages',
        upperFirstCamelCaseName,
        'components',
        'Form'
      );
    },
    getFileName: params => {
      return 'index.js';
    }
  },
  table: {
    getTemplateFilePath: () => {
      return path.join(
        __dirname,
        '../../Templates/Page',
        `table-with-redux.mustache`
      );
    },
    getFilePath: params => {
      const { upperFirstCamelCaseName } = params;
      return path.join(
        process.cwd(),
        'src',
        'pages',
        upperFirstCamelCaseName,
        'components',
        'Table'
      );
    },
    getFileName: params => {
      return 'index.js';
    }
  },
  reduxAction: {
    getTemplateFilePath: () => {
      return path.join(
        __dirname,
        '../../Templates/Store',
        `redux-action.mustache`
      );
    },
    getFilePath: () => {
      return path.join(process.cwd(), 'src', 'store', 'ducks');
    },
    getFileName: params => {
      const { lowerName } = params;
      return `${lowerName}.js`;
    }
  },
  saga: {
    getTemplateFilePath: () => {
      return path.join(__dirname, '../../Templates/Store', `saga.mustache`);
    },
    getFilePath: () => {
      return path.join(process.cwd(), 'src', 'store', 'sagas');
    },
    getFileName: params => {
      const { lowerName } = params;
      return `${lowerName}.js`;
    }
  }
};

const askForOverwriteFile = async path => {
  let answers = false;
  answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'toBeOverwritten',
      message: `O arquivo ${path} já existe, você quer que ele seja sobrescrito?`,
      default: false
    }
  ]);
  return answers;
};

const printInitMessage = template => {
  console.log(chalk.blue(`Starting to generate ${template}`));
};

const printStatusMessage = data => {
  let colors = {
    warning: message => {
      console.log(chalk.yellow(message));
    },
    error: message => {
      console.log(chalk.red(message));
    },
    success: message => {
      console.log(chalk.green(message));
    }
  };

  colors[data.status](data.message);
};

const generate = async (template, params, options) => {
  const { upperFirstCamelCaseName, lowerName } = params;
  const { force } = options;

  const templateFilePath = templatesConfigs[template].getTemplateFilePath();

  const filePath = templatesConfigs[template].getFilePath({
    upperFirstCamelCaseName
  });

  const fileName = templatesConfigs[template].getFileName(params);

  const fullPath = path.join(filePath, fileName);

  try {
    const templateFileString = readTemplateFile(templateFilePath);

    var rendered = renderTemplate(templateFileString, {
      upperFirstCamelCaseName,
      lowerName
    });

    if (force) {
      writeFile(filePath, fileName, rendered);
      return { status: 'success', message: `${template} was generated` };
    }

    const isFileExists = await fileExists(fullPath);

    if (isFileExists) {
      //Desacoplar o askForOveriteFile
      let { toBeOverwritten } = await askForOverwriteFile(fullPath);
      if (!toBeOverwritten) {
        return {
          status: 'warning',
          message: `You did chosen for not to generate ${template} `
        };
      }
    }

    writeFile(filePath, fileName, rendered);
    return { status: 'success', message: `${template} was generated` };
  } catch (e) {
    return { status: 'error', message: e.message };
  }
};

const generatePage = async (
  { upperFirstCamelCaseName, lowerName },
  options
) => {
  return await generate(
    'page',
    { upperFirstCamelCaseName, lowerName },
    options
  );
};

const generateForm = async (
  { upperFirstCamelCaseName, lowerName },
  options
) => {
  return generate('form', { upperFirstCamelCaseName, lowerName }, options);
};

const generateTable = async (
  { upperFirstCamelCaseName, lowerName },
  options
) => {
  return await generate(
    'table',
    { upperFirstCamelCaseName, lowerName },
    options
  );
};

const generateReduxAction = async (
  { upperFirstCamelCaseName, lowerName },
  options
) => {
  return await generate(
    'reduxAction',
    { upperFirstCamelCaseName, lowerName },
    options
  );
};

const generateSaga = async (
  { upperFirstCamelCaseName, lowerName },
  options
) => {
  return await generate(
    'saga',
    { upperFirstCamelCaseName, lowerName },
    options
  );
};

/**
 *
 * @param {*} args Parâmetros
 */
export async function handle(name, options) {
  const upperFirstCamelCaseName = upperFirst(camelCase(toLower(name)));
  const lowerName = toLower(name);
  const { reduxSaga } = options;

  printInitMessage('Page');
  let statusPage = await generatePage(
    { upperFirstCamelCaseName, lowerName },
    options
  );
  printStatusMessage(statusPage);

  printInitMessage('Form');
  let statusForm = await generateForm(
    { upperFirstCamelCaseName, lowerName },
    options
  );
  printStatusMessage(statusForm);

  printInitMessage('Table');
  let statusTable = await generateTable(
    { upperFirstCamelCaseName, lowerName },
    options
  );
  printStatusMessage(statusTable);

  if (reduxSaga) {
    printInitMessage('Redux Action');
    let statusRedux = await generateReduxAction(
      { upperFirstCamelCaseName, lowerName },
      options
    );
    printStatusMessage(statusRedux);

    printInitMessage('Saga');
    let statusSaga = await generateSaga(
      { upperFirstCamelCaseName, lowerName },
      options
    );
    printStatusMessage(statusSaga);
  }
}
