<template>
  <div 
    ref="lineRenderer" 
    class="LineRenderer"
  >
    <svg
      v-if="!stateScene.loading"
      :width="stateScene.width"
      :height="stateScene.height"
      xmlns="http://www.w3.org/2000/svg"
    >
      <template 
        v-for="({id, startPoint, inflectionPoint1, inflectionPoint2, endPoint}) in lines"
        :key="id"
      >
        <path 
          :d="`M ${startPoint.x},${startPoint.y} C ${inflectionPoint1.x},${inflectionPoint1.y} ${inflectionPoint2.x},${inflectionPoint2.y} ${endPoint.x},${endPoint.y}`"
        />
      </template>

      <template v-if="debug">
        <template v-for="({id, inflectionPoint1, inflectionPoint2 }) in lines" :key="`debug-${id}`">
          <circle 
            v-for="(inflexionPoint, index) in [inflectionPoint1, inflectionPoint2]" 
            :key="index"
            :cx="inflexionPoint.x"
            :cy="inflexionPoint.y"
            r="3"
            fill="red"
          />
        </template>
      </template>
    </svg>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed, toRefs, onBeforeUnmount } from 'vue'
import { state, lines } from '@/store'

export default {
  props: {
    debug: Boolean
  },

  setup () {
    const { debug } = toRefs(state)

    const stateScene = reactive({
      loading: true,
      width: 0,
      height: 0
    })

    const $lineRenderer = ref(null)

    let killHandDraw 

    onMounted(() => {
      Object.assign(stateScene, {
        loading: false,
        width: $lineRenderer.value.clientWidth,
        height: $lineRenderer.value.clientHeight
      })

      killHandDraw = enableHandDraw(document.querySelector('body'))
    })

    onBeforeUnmount(() => {
      killHandDraw()
    })

    return {
      stateScene,
      lineRenderer: $lineRenderer,
      lines,
      debug
    }
  }
}

function enableHandDraw($renderer) {
  let isDrawing = false

  function onPointerDown(e) {
    e.preventDefault()  
    isDrawing = true
  }
  
  function onPointerMove(e) {
    e.preventDefault()
    
    if (!isDrawing) return

    console.log('onPointerMove')

  }
  
  function onPointerUp(e) {
    e.preventDefault()  
    isDrawing = false
  }

  $renderer.addEventListener('pointerdown', onPointerDown)
  $renderer.addEventListener('pointermove', onPointerMove)
  $renderer.addEventListener('pointerup', onPointerUp)

  return () => {
    $renderer.removeEventListener('pointerdown', onPointerDown)
    $renderer.removeEventListener('pointermove', onPointerMove)
    $renderer.removeEventListener('pointerup', onPointerUp)
  }
}

</script>

<style scoped>
.LineRenderer {
  position: relative;
  overflow: hidden;
}

.LineRenderer svg {
  position: absolute;
}

path {
  stroke: limegreen;
  stroke-width: 0.2rem;
  stroke-linecap: round;
  fill: none;
}
</style>