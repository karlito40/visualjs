import { getDeclarations } from "./register";
import { VisualEvent, type VisualDefinition } from "./types";
import { groupBy } from "lodash-es";

class VisualJS {
  eventManager = new EventTarget();
  definitions: VisualDefinition[] = [];

  addDefinition(definition: VisualDefinition) {
    this.definitions.push(definition);

    this.eventManager.dispatchEvent(
      new CustomEvent(VisualEvent.DEFINITION_ADDED, {
        detail: definition,
      })
    );

    return this;
  }

  addDefinitions(definitions: VisualDefinition[]) {
    definitions.forEach((definition) => this.addDefinition(definition));

    return this;
  }

  // ================ //
  //    GETTERS       //
  // ================ //
  getDefinitions() {
    return this.definitions;
  }

  getLibraries() {
    // TODO: not opti at all
    // this data structure shouldn't be create in a getter
    const libraryMap = groupBy(this.definitions, "libraryName");
    const libraries = Object.entries(libraryMap).map(
      ([libraryName, definitions]) => ({
        name: libraryName,
        definitions,
      })
    );
    return libraries;
  }
}

let visual: VisualJS | null = null;

export async function init(): Promise<VisualJS> {
  console.log("Initializing VisualJS...");
  visual = new VisualJS();

  console.log("VisualJS libraries loading...");
  await import("./libraries");
  console.log("VisualJS libraries loaded");

  return visual.addDefinitions(getDeclarations());
}

// TODO use di & singleton instead
export function visualjs() {
  return visual;
}

// When you want to add a function but visualjs
// has already been initialized (load every declarations).
// export function dynamicImport(
//   libraryRef: VisualDefinition["libraryRef"],
//   func: Function,
//   {
//     args,
//   }: {
//     args: VisualDefinition["args"];
//   }
// ) {
//   if (!visualjs) {
//     throw new Error(
//       "VisualJS cannot dynamic import functions before its initilalization"
//     );
//   }

//   visualjs.addDefinition({
//     name: func.name,
//     libraryRef,
//     func,
//     args,
//   });

//   return (...args) => func(...args);
// }
