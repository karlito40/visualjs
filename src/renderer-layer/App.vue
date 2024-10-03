
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

      </div>
    </div>

    <div class="panel">
      libraries...
    </div>

    <div class="debug-definitions">
      definitions:
      <pre>{{ definitions }}</pre>
    </div>

    <button 
    class="debug-btn"
    @click="debug = !debug"
  >
    Toggle Debug
  </button>
  </main>
</template>

<script>
import { toRefs, onMounted } from 'vue'
import LineRenderer from './LineRenderer.vue'
import CodeNodeRenderer from './CodeNodeRenderer.vue'
import { state, getters } from '../store'
import { visualjs } from '@/visualjs/visualjs';
// import Panzoom from '@panzoom/panzoom'

export default {
  components: {
    LineRenderer,
    CodeNodeRenderer
  },

  setup () {
    const { debug } = toRefs(state)
    const { lines } = getters

    // onMounted(() => {
    //   const elem = document.querySelector('.engine')
    //   const panzoom = Panzoom(elem, {
    //     excludeClass: 'CodeNode'
    //   })
    //   const parent = elem.parentElement
    //   parent.addEventListener('wheel', function(event) {
    //     // if (!event.shiftKey) return
    //     panzoom.zoomWithWheel(event)
    //   })
    // })
    
    return {
      debug,
      lines,
      definitions: visualjs().getDefinitions(), // TODO: hook
    }
  }
}
</script>

<style scoped>
main {
  background: grey;
}

.engine {
  position: relative;
  height: 100vh;
  height: 3000px;
  width: 3000px;
  /* min-height: 100vh;
  min-width: 100vw; */
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
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 10;
}

.debug-definitions {
  position: fixed;
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

.panel {
  position: fixed;
  top: 2rem;
  left: 1.5rem;
  bottom: 10rem;
  padding: 1rem;
  background: white;
  width: 14rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: 1px solid #dcdcdc;
}
</style>
