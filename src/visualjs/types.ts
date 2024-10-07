type NodeArgument = {
  name: string;
  type: "number" | "string" | "any";
  fillMethod: "manual" | "socket";
};

export interface VisualDefinition {
  id: string;
  libraryName: string;
  funcName: string;
  func: Function;
  args: NodeArgument[];
}

export enum VisualEvent {
  DEFINITION_ADDED = "definition:added",
}
