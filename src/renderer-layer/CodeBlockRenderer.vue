<template>
  <div class="CodeBlockRenderer">
    <CodeNode 
      v-for="codeNode in codeNodes"
      :key="codeNode.id"
      :x="codeNode.x"
      :y="codeNode.y"
      :width="CARD_WIDTH"
      :name="codeNode.name"
      :data-codeNodeId="codeNode.id"
    />
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, toRefs } from 'vue'
import { Draggable } from 'gsap/Draggable'
import { state, actions } from '@/store'
import { CARD_WIDTH } from '@/constants'
import CodeNode from '@/renderer-layer/components/CodeNode.vue'

export default {
  components: {
    CodeNode
  },

  setup() {
    const { codeNodes } = toRefs(state)
    
    let draggable;

    onMounted(() => {
      let $draggedNode = null

      draggable = Draggable.create('.CodeNode', {
        inertia: true,
        onDragStart(e) {
          $draggedNode = e.target
        },
        onDrag(e) {
          if (!$draggedNode) {
            return;
          }

          const rect = $draggedNode.getBoundingClientRect()
          actions.updateCodeNode($draggedNode.dataset.codenodeid, {
            x: rect.x,
            y: rect.y
          })
        },
        onDragEnd() {
          $draggedNode = null
        }
      });
    })

    onBeforeUnmount(() => {
      draggable.kill()
    })

    return {
      codeNodes,
      CARD_WIDTH
    }
  }
}
</script>