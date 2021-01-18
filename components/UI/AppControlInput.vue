<template>
  <div class="input-control">
    <label><slot /></label>
    <input
      v-if="controlType === 'input'"
      v-bind="$attrs"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-if="controlType === 'textarea'"
      rows="2"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "AppInputControl",
  props: {
    controlType: {
      type: String,
      default: "input",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    }
  },
};
</script>

<style scoped>
.input-control {
  margin: 10px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  color: #414345;
  background-color: white;
  border: 1px solid #A4AEB3;
  border-radius: 4px;
  padding: 10px;
}

.input-control textarea {
  resize: none;
}

.input-control input:focus,
.input-control textarea:focus {
  outline: none;
}

.input-control input::placeholder,
.input-control textarea::placeholder {
  color: #A4AEB3;
}
</style>