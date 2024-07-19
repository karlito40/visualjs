import { reactive, computed } from "vue";
import { createSocketJoint } from "@/logic-layer/lines";

export const state = reactive({
  debug: true,
  cards: [
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

export const memos = {
  cardById: computed(() => {
    return state.cards.reduce((acc, card) => {
      acc[card.id] = card;
      return acc;
    }, {});
  }),

  lines: computed(() => {
    return [
      createSocketJoint(state.cards[0], state.cards[1]),
      createSocketJoint(state.cards[2], state.cards[1]),
    ];
  }),
};

export const actions = {
  updateCard: (cardId, input) => {
    if (!input) return;

    const card = memos.cardById.value[cardId];
    if (!card) {
      console.warn(`Cannot update card ${cardId}. No card found`);
    }

    return Object.assign(card, input);
  },
};
