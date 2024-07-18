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
      <path 
        v-for="({ id, path }) in svgLines"
        :key="id"
        :d="path" 
      />

      <template v-if="debug">
        <template v-for="({ id, inflectionPoints }) in lines" :key="`debug-${id}`">
          <circle 
            v-for="(inflectionPoint, index) in inflectionPoints" 
            :key="index"
            :cx="inflectionPoint.x"
            :cy="inflectionPoint.y"
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

    const svgLines = computed(() => {
      return lines.value.map(({ id, startPoint, inflectionPoints, endPoint }) => {
        return {
          id,
          path: `M ${startPoint.x},${startPoint.y} C ${pointsToSvg(inflectionPoints)} ${endPoint.x},${endPoint.y}`
        }
      })
    })

    onMounted(() => {
      Object.assign(stateScene, {
        loading: false,
        width: $lineRenderer.value.clientWidth,
        height: $lineRenderer.value.clientHeight
      })
    })

    initHandDrawLife()

    return {
      stateScene,
      lineRenderer: $lineRenderer,
      lines,
      svgLines,
      debug
    }
  }
}

function initHandDrawLife($renderer) {
  let killHandDraw 

  onMounted(() => {
    killHandDraw = enableHandDraw(document.querySelector('body'))
  })

  onBeforeUnmount(() => {
    killHandDraw()
  })
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

function pointsToSvg (points) {
  return points.map(point => `${point.x},${point.y}`).join(' ')
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