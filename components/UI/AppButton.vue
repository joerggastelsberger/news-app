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
  background-color: #dfa70c;
  border-radius: 4px;
}

.button:disabled {
  background-color: #dfa70c;
  cursor: default;
}

.cancel {
  background-color: #92999c;
  color: white;
}

.cancel:hover,
.cancel:active {
  background-color: #6c7275; 
}
</style>