<template>
  <div 
    ref="lineRenderer" 
    class="LineRenderer"
  >
    <svg
      v-if="!stateRenderer.loading"
      ref="lineScene"
      :width="stateRenderer.width"
      :height="stateRenderer.height"
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
import { ref, reactive, onMounted, computed, toRefs, onBeforeUnmount, watch } from 'vue'
import { state, memos } from '@/store'
import { enableHandJointCapacity } from '@/renderer-layer/browser/enableHandJointCapacity'
import { lineToPath } from '@/renderer-layer/helpers/lineToPath'

export default {
  props: {
    debug: Boolean
  },

  setup () {
    const { debug } = toRefs(state)
    const { lines } = memos

    const $lineRenderer = ref(null)
    const stateRenderer = reactive({
      loading: true,
      width: 0,
      height: 0
    })

    const svgLines = computed(() => {
      return memos.lines.value.map((line) => {
        return {
          id: line.id,
          path: lineToPath(line)
        }
      })
    })

    onMounted(() => {
      Object.assign(stateRenderer, {
        loading: false,
        width: $lineRenderer.value.clientWidth,
        height: $lineRenderer.value.clientHeight
      })
    })

    const { $lineScene } = useHandJointCapacity()

    return {
      stateRenderer,
      lineRenderer: $lineRenderer,
      lineScene: $lineScene,
      lines,
      svgLines,
      debug,
    }
  }
}

function useHandJointCapacity() {
  let $lineScene = ref(null)
  let disableHandJointCapacity

  watch($lineScene, ($el) => {
    if (!$el) {
      return disableHandJointCapacity?.()
    }

    disableHandJointCapacity = enableHandJointCapacity({
      $pointerContainer: document.querySelector('body'),
      $lineScene: $el,
    })
  })

  onBeforeUnmount(() => {
    disableHandJointCapacity?.()
  })

  return { 
    $lineScene 
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
</style>

<style>
/* DANGEROUS GLOBAL STYLE */
.LineRenderer path {
  stroke: limegreen;
  stroke-width: 0.2rem;
  stroke-linecap: round;
  fill: none;
}
</style>