import { CARD_WIDTH } from "@/constants";

export function createLineBetween(entryCard, endCard) {
  // todo
  const socketOutRect = {
    x: entryCard.x + CARD_WIDTH, // todo: use bounded rect
    y: entryCard.y + 24,
    height: 16,
    width: 16,
  };

  // todo
  const socketInRect = {
    x: endCard.x, // todo: use bounded rect
    y: endCard.y + 24,
    height: 16,
    width: 16,
  };

  const startPoint = {
    x: socketOutRect.x,
    y: socketOutRect.y + ~~(socketOutRect.height / 2),
    // x: entryCard.x + cardSize.width,
    // y: entryCard.y + ~~(cardSize.height/2)
  };

  const endPoint = {
    x: socketInRect.x,
    y: socketInRect.y + ~~(socketInRect.height / 2),
    // x: endCard.x,
    // y: endCard.y + ~~(cardSize.height/2),
  };

  const deltaX = endPoint.x - startPoint.x;
  const deltaY = endPoint.y - startPoint.y;
  return {
    id: `${entryCard.id}-${endCard.id}`,
    startPoint,
    inflectionPoints: [
      {
        // x: startPoint.x + ~~(deltaX / 2),
        // y: startPoint.y - deltaY / 10
        x: startPoint.x + ~~(Math.abs(deltaX) / 3),
        y: startPoint.y,
      },
      {
        x: endPoint.x - ~~(Math.abs(deltaX) / 3),
        y: endPoint.y,
      },
    ],
    endPoint,
  };
}
