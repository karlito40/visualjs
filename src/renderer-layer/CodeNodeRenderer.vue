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
    />
  </div>
</template>

<script>
import { toRefs } from 'vue'
import { state } from '@/store'
import { CARD_WIDTH } from '@/constants'
import CodeNode from '@/renderer-layer/components/CodeNode.vue'
import { useMovingCodeNode } from '@/renderer-layer/hooks';

export default {
  components: {
    CodeNode
  },

  setup() {
    const { codeNodes } = toRefs(state)
    
    useMovingCodeNode('.CodeNode')
    
    return {
      codeNodes,
      CARD_WIDTH
    }
  }
}
</script>