import { upperFirst, camelCase, toLower } from "lodash";
import Mustache from "mustache";
import path from "path";
import fs from "fs";
import { writeFile, readTemplateFile, renderTemplate } from "../../Commons";

const templatesConfigs = {
  page: {
    getTemplateFilePath: () => {
      return path.join(
        __dirname,
        "../../Templates/Page",
        `index-with-redux.mustache`
      );
    },
    getFilePath: params => {
      const { upperFirstCamelCaseName } = params;
      return path.join(process.cwd(), "src", "pages", upperFirstCamelCaseName);
    }
  },
  form: {
    getTemplateFilePath: () => {
      return path.join(
        __dirname,
        "../../Templates/Page",
        `form-with-redux.mustache`
      );
    },
    getFilePath: params => {
      const { upperFirstCamelCaseName } = params;
      return path.join(
        process.cwd(),
        "src",
        "pages",
        upperFirstCamelCaseName,
        "components",
        "Form"
      );
    }
  },
  table: {
    getTemplateFilePath: () => {
      return path.join(
        __dirname,
        "../../Templates/Page",
        `table-with-redux.mustache`
      );
    },
    getFilePath: params => {
      const { upperFirstCamelCaseName } = params;
      return path.join(
        process.cwd(),
        "src",
        "pages",
        upperFirstCamelCaseName,
        "components",
        "Table"
      );
    }
  },
  reduxAction: {
    getTemplateFilePath: () => {
      return path.join(
        __dirname,
        "../../Templates/Store",
        `redux-action.mustache`
      );
    },
    getFilePath: () => {
      return path.join(process.cwd(), "src", "store", "ducks");
    }
  },
  saga: {
    getTemplateFilePath: () => {
      return path.join(__dirname, "../../Templates/Store", `saga.mustache`);
    },
    getFilePath: () => {
      return path.join(process.cwd(), "src", "store", "sagas");
    }
  }
};

const generate = (template, { upperFirstCamelCaseName, lowerName }) => {
  const templateFilePath = templatesConfigs[template].getTemplateFilePath();

  const filePath = templatesConfigs[template].getFilePath({
    upperFirstCamelCaseName
  });

  try {
    const templateFileString = readTemplateFile(templateFilePath);

    var rendered = renderTemplate(templateFileString, {
      upperFirstCamelCaseName,
      lowerName
    });

    writeFile(filePath, "index.js", rendered);
  } catch (e) {
    console.log(e);
  }
};

const generatePage = ({ upperFirstCamelCaseName, lowerName }) => {
  generate("page", { upperFirstCamelCaseName, lowerName });
};

const generateForm = ({ upperFirstCamelCaseName, lowerName }) => {
  generate("form", { upperFirstCamelCaseName, lowerName });
};

const generateTable = ({ upperFirstCamelCaseName, lowerName }) => {
  generate("table", { upperFirstCamelCaseName, lowerName });
};

const generateReduxAction = ({ upperFirstCamelCaseName, lowerName }) => {
  generate("reduxAction", { upperFirstCamelCaseName, lowerName });
};

const generateSaga = ({ upperFirstCamelCaseName, lowerName }) => {
  generate("saga", { upperFirstCamelCaseName, lowerName });
};

/**
 *
 * @param {*} args Parâmetros
 */
export async function handle({ name, options }) {
  const upperFirstCamelCaseName = upperFirst(camelCase(toLower(name)));
  const lowerName = toLower(name);
  generatePage({ upperFirstCamelCaseName, lowerName });
  generateForm({ upperFirstCamelCaseName, lowerName });
  generateTable({ upperFirstCamelCaseName, lowerName });
  generateReduxAction({ upperFirstCamelCaseName, lowerName });
  generateSaga({ upperFirstCamelCaseName, lowerName });
}
