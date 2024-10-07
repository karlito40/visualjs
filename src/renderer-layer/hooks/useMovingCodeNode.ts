import { Draggable } from "gsap/Draggable";
import { watch } from "vue";

// ====================================================== //
//   Move a code node dom element
// ====================================================== //
export function useMovingCodeNode(nodeRef, { onDrag }) {
  watch(
    nodeRef,
    (newNodeElement, prevNodeElement, onCleanup) => {
      if (!newNodeElement) {
        return;
      }

      let $draggedNode = null;

      const draggables = Draggable.create(newNodeElement, {
        inertia: true,
        onDragStart(e) {
          $draggedNode = e.target;
        },
        onDrag(e) {
          if (!$draggedNode) {
            return;
          }

          const rect = $draggedNode.getBoundingClientRect();
          onDrag({
            boundingRect: rect,
            $draggedNode,
          });
        },
        onDragEnd() {
          $draggedNode = null;
        },
      });

      onCleanup(() => {
        // TODO: test
        console.log("kill draggable node", newNodeElement);
        for (const draggable of draggables) {
          draggable.kill();
        }
      });
    },
    { immediate: true }
  );
}
