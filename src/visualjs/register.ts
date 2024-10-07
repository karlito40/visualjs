import type { VisualDefinition } from "./types";
import { nanoid } from "nanoid";

const declarations: VisualDefinition[] = [];

// Use to add a function to visualjs before its initilalization
// Typically when you create a lib
// It will also avoid circular deps issue
export function register(
  libraryName: VisualDefinition["libraryName"],
  func: Function,
  {
    args,
  }: {
    args?: VisualDefinition["args"];
  } = {}
) {
  // TODO: use visualjs instance if it's already initialized

  console.log("VisualJS register", libraryName, func.name, args);

  declarations.push({
    id: nanoid(),
    libraryName,
    funcName: func.name,
    func,
    args: args || [],
  });

  return (...args) => func(...args);
}

export function getDeclarations(): VisualDefinition[] {
  return declarations;
}
