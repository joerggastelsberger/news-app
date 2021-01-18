<template>
  <button
    class="button"
    :class="btnStyle"
    :disabled="disable"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    btnStyle: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.button {
  font: inherit;
  background-color: #FFBE0A;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
}

.button:hover,
.button:active {
  background-color: #CFA20E;
  border-radius: 4px;
}

.button:disabled {
  opacity: 74%;
  cursor: default;
}

.button:disabled:hover,
.button:disabled:active {
  background-color: #E8B610;
  border-radius: 4px;
}

.cancel {
  background-color: #6c7275;
  color: white;
}

.cancel:hover,
.cancel:active {
  background-color: transparent; 
  border: 1px solid #6c7275;
  color: white;
}
</style>