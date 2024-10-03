import { reactive, computed } from "vue";
import { createSocketJoint } from "@/logic-layer/line";

export const state = reactive({
  debug: true,
  codeNodes: [
    {
      id: 1,
      name: "Var node",
      x: 250,
      y: 100,
    },
    {
      id: 2,
      name: "Log node",
      x: 600,
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
      id: 3,
      name: "Test",
      x: 200,
      y: 300,
      argsPorts: [],
    },
  ],
});

export const getters = {
  codeNodeById: computed(() => {
    return state.codeNodes.reduce((acc, codeNode) => {
      acc[codeNode.id] = codeNode;
      return acc;
    }, {});
  }),

  lines: computed(() => {
    return [
      createSocketJoint(state.codeNodes[0], state.codeNodes[1]),
      createSocketJoint(state.codeNodes[2], state.codeNodes[1]),
    ];
  }),
};

export const actions = {
  updateCodeNode: (nodeId, input) => {
    if (!input) return;

    const codeNode = getters.codeNodeById.value[nodeId];
    if (!codeNode) {
      console.warn(`Cannot update codeNode ${nodeId}. No node found`);
    }

    return Object.assign(codeNode, input);
  },
};
