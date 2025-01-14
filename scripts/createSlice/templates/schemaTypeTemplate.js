import firstCharUpperCase from "../firstCharUpperCase.js";

export default function schemaTypeTemplate(sliceName) {
  return `export interface ${firstCharUpperCase(sliceName)}Schema {
    // Определите свойства схемы состояния
}`;
}
