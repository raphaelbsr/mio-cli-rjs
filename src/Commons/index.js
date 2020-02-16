import path from "path";
import fs from "fs";
import Mustache from "mustache";

const fileExists = async path => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.error(err);
  }
};

const writeFile = async (filePath, fileName, content) => {
  try {
    const absoluteFileName = path.join(filePath, fileName);

    fs.mkdirSync(filePath, { recursive: true });
    const data = fs.writeFileSync(absoluteFileName, content);
    return true;
  } catch (err) {
    return err;
  }
};

const readTemplateFile = filePath => {
  return fs.readFileSync(filePath, "utf-8");
};

const renderTemplate = (
  templateFileString,
  { upperFirstCamelCaseName, lowerName }
) => {
  return Mustache.render(templateFileString, {
    upperFirstCamelCaseName,
    lowerName
  });
};

export { writeFile, readTemplateFile, renderTemplate, fileExists };
