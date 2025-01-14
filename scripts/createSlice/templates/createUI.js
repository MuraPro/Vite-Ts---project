import { mkdir, writeFile } from "fs/promises";
import resolveRoot from "../resolveRoot.js";
import firstCharUpperCase from "../firstCharUpperCase.js";
import componentTemplate from "./componentTemplate.js";
import storyTemplate from "./storyTemplate.js";
import styleTemplate from "./styleTemplate.js";

export default async function createUI(layer, sliceName) {
  const resolveUIPath = (...segments) =>
    resolveRoot("src", layer, sliceName, "ui", ...segments);

  const createUIDir = async () => {
    try {
      await mkdir(resolveUIPath());
    } catch (e) {
      console.log("Не удалось создать UI директорию", e);
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName);
      await mkdir(resolveUIPath(componentName));
      await writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      );
      await writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        storyTemplate(layer, componentName),
      );
      await writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      );
    } catch (e) {
      console.log("Не удалось создать компонент", e);
    }
  };

  await createUIDir();
  await createComponent();
}
