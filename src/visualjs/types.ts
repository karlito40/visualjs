export interface VisualDefinition {
  name: string;
  libraryRef: string;
  func: Function;
  args: string[];
}

export enum VisualEvent {
  DEFINITION_ADDED = "definition:added",
}
