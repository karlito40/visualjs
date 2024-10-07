<template>
  <div 
    class="CodeNodeRenderer"
    data-can-draw-line="true"
  >
    <CodeNode 
      v-for="codeNode in codeNodes"
      :key="codeNode.id"
      :x="codeNode.x"
      :y="codeNode.y"
      :width="CARD_WIDTH"
      :name="codeNode.name"
      :data-code-node-id="codeNode.id"
      @drag="onDrag(codeNode, $event)"
    />
  </div>
</template>

<script>
import { toRefs } from 'vue'
import { store, actions } from '@/store'
import { CARD_WIDTH } from '@/constants'
import CodeNode from '@/renderer-layer/components/CodeNode.vue'
// import { useMovingCodeNode } from '@/renderer-layer/hooks';

export default {
  components: {
    CodeNode
  },

  setup() {
    const { codeNodes } = toRefs(store)
        
    const onDrag = (codeNode, { boundingRect }) => {
      actions.updateCodeNode(codeNode.id, {
        x: boundingRect.x,
        y: boundingRect.y
      })
    }

    return {
      codeNodes,
      actions,
      onDrag,
      CARD_WIDTH
    }
  }
}
</script>