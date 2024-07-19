import { createLineBetween } from "@/logic-layer/lines";
import { fromEvent, takeUntil, mergeMap, tap, last } from "rxjs";
import { lineToPath } from "@/renderer-layer/helpers/lineToPath";

const LINE_ID = "line-draw";

export function enableHandJointCapacity({ $pointerContainer, $lineScene }) {
  const down$ = fromEvent($pointerContainer, "pointerdown");
  const move$ = fromEvent($pointerContainer, "pointermove");
  const up$ = fromEvent($pointerContainer, "pointerup");

  let initialPosition;
  let $currentLine;
  const draw$ = down$.pipe(
    tap((down) => {
      initialPosition = {
        x: ~~down.clientX,
        y: ~~down.clientY,
      };
      $currentLine = $lineScene.querySelector(`.${LINE_ID}`);
    }),

    mergeMap((down) => move$.pipe(takeUntil(up$)))
  );

  const drawSubscription = draw$.subscribe((e) => {
    const currentPosition = {
      x: ~~e.clientX,
      y: ~~e.clientY,
    };

    const line = createLineBetween(initialPosition, currentPosition, LINE_ID);
    const path = lineToPath(line);
    if (!$currentLine) {
      $currentLine = createPathElement({
        className: LINE_ID,
        d: path,
      });
      $lineScene.appendChild($currentLine);
    } else {
      $currentLine.setAttribute("d", path);
    }
  });

  const upSubscription = up$.subscribe(() => {
    if ($currentLine) {
      $currentLine.remove();
    }
    $currentLine = null;
  });

  return () => {
    drawSubscription.unsubscribe();
    upSubscription.unsubscribe();
  };
}

function createPathElement({ className, d }) {
  const $el = document.createElementNS("http://www.w3.org/2000/svg", "path");
  d && $el.setAttribute("d", d);
  className && $el.setAttribute("class", className);

  return $el;
}
