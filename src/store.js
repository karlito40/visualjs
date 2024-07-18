import { reactive, computed } from "vue";
import { createLineBetween } from "@/logic-layer/lines";

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

export const cardById = computed(() => {
  return state.cards.reduce((acc, card) => {
    acc[card.id] = card;
    return acc;
  }, {});
});

export const lines = computed(() => {
  return [
    createLineBetween(state.cards[0], state.cards[1]),
    createLineBetween(state.cards[2], state.cards[1]),
  ];
});

export const updateCard = (cardId, input) => {
  if (!input) return;

  const card = cardById.value[cardId];
  if (!card) {
    console.warn(`Cannot update card ${cardId}. No card found`);
  }

  return Object.assign(card, input);
};
