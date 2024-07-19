import { CARD_WIDTH } from "@/constants";
import { uniqid } from "@/share/uniqid";

const SOCKET_SIZE = 16;
// TODO: remove
export function createSocketJoint(fromCodeBox, toCodeBox) {
  // todo
  const socketOutRect = {
    x: fromCodeBox.x + CARD_WIDTH, // todo: use bounded rect
    y: fromCodeBox.y + 24, // todo: hardcoded pos
    height: SOCKET_SIZE,
    width: SOCKET_SIZE,
  };

  // todo
  const socketInRect = {
    x: toCodeBox.x, // todo: use bounded rect
    y: toCodeBox.y + 24,
    height: SOCKET_SIZE,
    width: SOCKET_SIZE,
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

  return createLineBetween(startPoint, endPoint, {
    id: `${fromCodeBox.id}-${toCodeBox.id}`,
  });
}

export function createLineBetween(
  startPoint,
  endPoint,
  { id = uniqid() } = {}
) {
  const deltaX = endPoint.x - startPoint.x;
  // const deltaY = endPoint.y - startPoint.y;
  return {
    id,
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
