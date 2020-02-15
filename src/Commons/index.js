import path from "path";
import fs from "fs";
import Mustache from "mustache";

const writeFile = async (filePath, fileName, content) => {
  try {
    const absoluteFileName = path.join(filePath, fileName);

    fs.mkdirSync(filePath, { recursive: true });
    const data = fs.writeFileSync(absoluteFileName, content);
    return true;
  } catch (err) {
    console.error(err);
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

export { writeFile, readTemplateFile, renderTemplate };
