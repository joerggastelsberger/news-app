<template>
  <div
    class="drawer-toggle"
    role="button"
    @click="$emit('toggle')">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<style scoped>
.drawer-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 1.5rem;
  width: 2rem;
  cursor: pointer;
}

.drawer-toggle .bar {
  height: 4px;
  background-color: white;
  border-radius: 16px;
}
</style>
