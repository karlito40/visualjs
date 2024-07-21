import type { VisualDefinition } from "./types";

const declarations: VisualDefinition[] = [];

// Use to add a function to visualjs before its initilalization
// Typically when you create a lib
// It will also avoid circular deps issue
export function register(
  libraryRef: VisualDefinition["libraryRef"],
  func: Function,
  {
    args,
  }: {
    args?: VisualDefinition["args"];
  } = {}
) {
  // TODO: use visualjs instance if it's already initialized

  console.log("VisualJS register", libraryRef, func.name, args);

  declarations.push({
    name: func.name,
    libraryRef,
    func,
    args: args || [],
  });

  return (...args) => func(...args);
}

export function getDeclarations(): VisualDefinition[] {
  return declarations;
}
