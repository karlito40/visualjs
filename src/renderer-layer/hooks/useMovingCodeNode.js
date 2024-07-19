import { Draggable } from "gsap/Draggable";
import { actions } from "@/store";
import { onBeforeUnmount, onMounted } from "vue";

// ====================================================== //
//   Move a code node dom element
// ====================================================== //
export function useMovingCodeNode(querySelector) {
  let draggables;
  onMounted(() => {
    let $draggedNode = null;

    draggables = Draggable.create(querySelector, {
      inertia: true,
      onDragStart(e) {
        $draggedNode = e.target;
      },
      onDrag(e) {
        if (!$draggedNode) {
          return;
        }

        const rect = $draggedNode.getBoundingClientRect();
        actions.updateCodeNode($draggedNode.dataset.codenodeid, {
          x: rect.x,
          y: rect.y,
        });
      },
      onDragEnd() {
        $draggedNode = null;
      },
    });
  });

  onBeforeUnmount(() => {
    for (const draggable of draggables) {
      draggable.kill();
    }

    draggables = null;
  });
}
