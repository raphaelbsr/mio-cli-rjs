import { upperFirst, camelCase, toLower } from "lodash";
import Mustache from "mustache";
import path from "path";
import fs from "fs";

const writeFile = async (filePath, fileName, content) => {
  try {
    const absoluteFileName = path.join(filePath, fileName);

    fs.mkdirSync(filePath, { recursive: true });
    const data = fs.writeFileSync(absoluteFileName, content);
  } catch (err) {
    console.error(err);
  }
};

const generatePage = ({ upperFirstCamelCaseName, lowerName }) => {
  const templateFilePath = path.join(
    __dirname,
    "../../Templates/Page",
    `index-with-redux.mustache`
  );

  const filePath = path.join(
    process.cwd(),
    "src",
    "pages",
    upperFirstCamelCaseName
  );

  try {
    const templateFileString = fs.readFileSync(templateFilePath, "utf-8");
    var rendered = Mustache.render(templateFileString, {
      upperFirstCamelCaseName,
      lowerName
    });

    writeFile(filePath, "index.js", rendered);
  } catch (e) {
    console.log(e);
  }
};

const generateForm = ({ upperFirstCamelCaseName, lowerName }) => {
  const templateFilePath = path.join(
    __dirname,
    "../../Templates/Page",
    `form-with-redux.mustache`
  );

  const filePath = path.join(
    process.cwd(),
    "src",
    "pages",
    upperFirstCamelCaseName,
    "components",
    "Form"
  );

  try {
    const templateFileString = fs.readFileSync(templateFilePath, "utf-8");
    var rendered = Mustache.render(templateFileString, {
      upperFirstCamelCaseName,
      lowerName
    });

    writeFile(filePath, "index.js", rendered);
  } catch (e) {
    console.log(e);
  }
};

const generateTable = ({ upperFirstCamelCaseName, lowerName }) => {
  const templateFilePath = path.join(
    __dirname,
    "../../Templates/Page",
    `table-with-redux.mustache`
  );

  const filePath = path.join(
    process.cwd(),
    "src",
    "pages",
    upperFirstCamelCaseName,
    "components",
    "Table"
  );

  try {
    const templateFileString = fs.readFileSync(templateFilePath, "utf-8");
    var rendered = Mustache.render(templateFileString, {
      upperFirstCamelCaseName,
      lowerName
    });

    writeFile(filePath, "index.js", rendered);
  } catch (e) {
    console.log(e);
  }
};

const generateReduxAction = ({ upperFirstCamelCaseName, lowerName }) => {
  const templateFilePath = path.join(
    __dirname,
    "../../Templates/Store",
    `redux-action.mustache`
  );

  const filePath = path.join(process.cwd(), "src", "store", "ducks");

  try {
    const templateFileString = fs.readFileSync(templateFilePath, "utf-8");
    var rendered = Mustache.render(templateFileString, {
      upperFirstCamelCaseName,
      lowerName
    });

    writeFile(filePath, `${lowerName}.js`, rendered);
  } catch (e) {
    console.log(e);
  }
};

const generateSaga = ({ upperFirstCamelCaseName, lowerName }) => {
  const templateFilePath = path.join(
    __dirname,
    "../../Templates/Store",
    `saga.mustache`
  );

  const filePath = path.join(process.cwd(), "src", "store", "sagas");

  try {
    const templateFileString = fs.readFileSync(templateFilePath, "utf-8");
    var rendered = Mustache.render(templateFileString, {
      upperFirstCamelCaseName,
      lowerName
    });

    writeFile(filePath, `${lowerName}.js`, rendered);
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {*} args Parâmetros
 */
export async function handle({ name, options }) {
  const upperFirstCamelCaseName = upperFirst(camelCase(toLower(name)));
  const lowerName = toLower(name);

  // const filePath = path.join(__dirname);
  // console.log(process.cwd());
  // console.log(filePath);
  // generatePage({ upperFirstCamelCaseName, lowerName });
  // generateForm({ upperFirstCamelCaseName, lowerName });
  // generateTable({ upperFirstCamelCaseName, lowerName });
  // generateReduxAction({ upperFirstCamelCaseName, lowerName });
  generateSaga({ upperFirstCamelCaseName, lowerName });
}
