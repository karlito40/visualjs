<template>
  <div class="CardRenderer">
    <Card 
      v-for="card in cards"
      :key="card.id"
      :x="card.x"
      :y="card.y"
      :width="CARD_WIDTH"
      :name="card.name"
      :data-cardId="card.id"
    />
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, toRefs } from 'vue'
import { Draggable } from 'gsap/Draggable'
import { state, actions } from '@/store'
import { CARD_WIDTH } from '@/constants'
import Card from '@/renderer-layer/components/Card.vue'

export default {
  components: {
    Card
  },

  setup() {
    const { cards } = toRefs(state)
    
    let draggable;

    onMounted(() => {
      let $draggedCard = null

      draggable = Draggable.create('.Card', {
        inertia: true,
        onDragStart(e) {
          $draggedCard = e.target
        },
        onDrag(e) {
          if (!$draggedCard) {
            return;
          }

          const rect = $draggedCard.getBoundingClientRect()
          actions.updateCard($draggedCard.dataset.cardid, {
            x: rect.x,
            y: rect.y
          })
        },
        onDragEnd() {
          $draggedCard = null
        }
      });
    })

    onBeforeUnmount(() => {
      draggable.kill()
    })

    return {
      cards,
      CARD_WIDTH
    }
  }
}
</script>