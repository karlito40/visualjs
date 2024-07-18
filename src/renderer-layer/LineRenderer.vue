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
import { state, memos } from '@/store'
import { addHandJointCapacity } from '@/browser/add-hand-joint-capacity'

export default {
  props: {
    debug: Boolean
  },

  setup () {
    const { debug } = toRefs(state)
    const { lines } = memos

    const $lineRenderer = ref(null)
    const stateScene = reactive({
      loading: true,
      width: 0,
      height: 0
    })

    const svgLines = computed(() => {
      return memos.lines.value.map(({ id, startPoint, inflectionPoints, endPoint }) => {
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

    useHandJointCapacity(document.querySelector('body'))

    return {
      stateScene,
      lineRenderer: $lineRenderer,
      lines,
      svgLines,
      debug
    }
  }
}

function useHandJointCapacity($container) {
  let stopDrawEvent 

  onMounted(() => {
    stopDrawEvent = addHandJointCapacity($container)
  })

  onBeforeUnmount(stopDrawEvent)
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