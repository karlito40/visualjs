// import { fromEvent, takeUntil, mergeMap, tap } from "rxjs";
import { ref, watch, onBeforeUnmount } from "vue";
import { createLineBetween } from "@/logic-layer/lines";
import { lineToPath } from "@/renderer-layer/helpers/lineToPath";

const LINE_ID = "line-draw";

// ====================================================== //
//   Draw a bezirer curve with the current pointer
// ====================================================== //
export function useDrawingLine() {
  let $lineScene = ref(null);
  let disableHandJointCapacity;

  watch($lineScene, ($currentLineScene) => {
    if (!$currentLineScene) {
      return disableHandJointCapacity?.();
    }

    disableHandJointCapacity = enableHandJointCapacity({
      $pointerContainer: document.querySelector("body"),
      $lineScene: $currentLineScene,
    });
  });

  onBeforeUnmount(() => {
    disableHandJointCapacity?.();
  });

  return {
    $lineScene,
  };
}

function enableHandJointCapacity({ $pointerContainer, $lineScene }) {
  let initialPosition;
  let $currentLine;
  let isDragging = false;

  function onPointerDown(e) {
    if (!e.target.dataset.canDrawLine) return;

    isDragging = true;
    initialPosition = {
      x: ~~e.clientX,
      y: ~~e.clientY,
    };
    $currentLine = $lineScene.querySelector(`.${LINE_ID}`);
  }

  function onPointerMove(e) {
    if (!isDragging) return;

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
  }

  function onPointerUp(e) {
    isDragging = false;
    if ($currentLine) {
      $currentLine.remove();
    }
    $currentLine = null;
  }

  $pointerContainer.addEventListener("pointerdown", onPointerDown);
  $pointerContainer.addEventListener("pointermove", onPointerMove);
  $pointerContainer.addEventListener("pointerup", onPointerUp);

  return () => {
    $pointerContainer.removeEventListener("pointerdown", onPointerDown);
    $pointerContainer.removeEventListener("pointermove", onPointerMove);
    $pointerContainer.removeEventListener("pointerup", onPointerUp);
  };
}

function createPathElement({ className, d }) {
  const $el = document.createElementNS("http://www.w3.org/2000/svg", "path");
  d && $el.setAttribute("d", d);
  className && $el.setAttribute("class", className);

  return $el;
}
