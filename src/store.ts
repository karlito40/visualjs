import { reactive, computed } from "vue";
import { createSocketJoint } from "@/logic-layer/line";
import type { VisualDefinition } from "./visualjs/types";
import { nanoid } from "nanoid";

export const store = reactive({
  debug: true,
  codeNodes: [
    {
      id: nanoid(),
      name: "Var node",
      x: 450,
      y: 100,
    },
    {
      id: nanoid(),
      name: "Log node",
      x: 900,
      y: 200,
      argsPorts: [
        {
          name: "message",
          inputNodeId: null,
        },
        {
          name: "value",
          inputNodeId: 1,
        },
      ],
    },
    {
      id: nanoid(),
      name: "Test",
      x: 550,
      y: 350,
      argsPorts: [],
    },
  ],
});

export const getters = {
  codeNodeById: computed(() => {
    return store.codeNodes.reduce((acc, codeNode) => {
      acc[codeNode.id] = codeNode;
      return acc;
    }, {});
  }),

  lines: computed(() => {
    return [
      createSocketJoint(store.codeNodes[0], store.codeNodes[1]),
      createSocketJoint(store.codeNodes[2], store.codeNodes[1]),
    ];
  }),
};

export const actions = {
  updateCodeNode(nodeId, input) {
    if (!input) return;

    const codeNode = getters.codeNodeById.value[nodeId];
    if (!codeNode) {
      console.warn(`Cannot update codeNode ${nodeId}. No node found`);
    }

    return Object.assign(codeNode, input);
  },

  addCodeNode(definition: VisualDefinition) {
    store.codeNodes.push({
      id: nanoid(),
      name: definition.funcName,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      argsPorts: [],
    });
  },
};
