
<template>
  <main>
    <div class="engine">
      <LineRenderer />
      <CodeNodeRenderer />

      <div 
        v-if="debug"
        class="debug-layer"
      >
        <!-- <div class="debug-lines">
          lines:
          <pre>{{ lines }}</pre>
        </div> -->

        <div class="debug-definitions">
          definitions:
          <pre>{{ definitions }}</pre>
        </div>
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
import { visualjs } from '@/visualjs/visualjs';

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
      lines,
      definitions: visualjs().getDefinitions(), // TODO: hook
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

.debug-definitions {
  position: absolute;
  bottom: 1rem;
  left: 10rem;
  right: 1rem;
  max-height: 20rem;
  overflow: auto;
  
  padding: 1rem;
  border: 1px solid #dcdcdc;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.debug-lines {
  position: absolute;
  max-height: 50rem;
  width: 15rem;
  overflow-y: hidden;
  overflow-y: auto;
}
</style>
