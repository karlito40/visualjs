<template>
  <div 
    class="CodeNode"
    :style="{
      transform: `translate3d(${x}px, ${y}px, 0)`,
      width: `${width}px`,
    }"
  >
    {{ name }}
    <div class="socket-container socket-in-container">
      <div class="socket socket-in"></div>
      <div class="socket socket-in"></div>
    </div>
    <div class="socket-container socket-out-container">
      <div class="socket socket-out"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['x', 'y', 'width', 'height', 'name']
}
</script>

<style scoped>
.CodeNode {
  position: absolute;
  padding: 1rem;
  width: 10rem;
  min-height: 6rem;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.CodeNode:hover, .CodeNode:hover .socket-out {
  border: 1px solid #87c6ec;
}

.socket-container {
  position: absolute;
  top: 1.5rem;
}

.socket-in-container {
  left: -0.5rem;
}

.socket-out-container {
  right: -0.5rem;
}

.socket {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background: white;
  border: 1px solid #dcdcdc;
  margin-bottom: 1.5rem;
}
</style>