
<template>
  <main>
    <div class="engine">
      <LineRenderer />
      <CodeNodeRenderer />

      <div 
        v-if="debug"
        class="debug-layer"
      >
        <pre>{{ lines }}</pre>
      </div>

      <button 
        class="debug-btn"
        @click="debug = !debug"
      >
        Toggle Debug
      </button>
    </div>
  </main>
</template>

<script>
import { toRefs } from 'vue'
import LineRenderer from './LineRenderer.vue'
import CodeNodeRenderer from './CodeNodeRenderer.vue'
import { state, memos } from '../store'

export default {
  components: {
    LineRenderer,
    CodeNodeRenderer
  },

  setup () {
    const { debug } = toRefs(state)
    const { lines } = memos
    
    return {
      debug,
      lines
    }
  }
}
</script>

<style scoped>
.engine {
  position: relative;
  height: 100vh;
  background: white;
  background-size: 25px 25px;
  background-image: linear-gradient(to right, #f1f1f1 1px, transparent 1px), linear-gradient(to bottom, #f1f1f1 1px, transparent 1px);
}

.LineRenderer, .CodeNodeRenderer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.debug-btn {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 10;
}
</style>
