<template>
  <div class="dropdown" @blur="open = false">
    <div class="selected" :class="{ 'selected--border': open }" @click="open = !open">
      {{ selectedItem.text }}
    </div>
    <div v-show="open" class="items">
      <div
        class="item"
        v-for="item in items"
        :key="item.value"
        @click="onClick(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedItem: this.items[0],
      open: false,
    };
  },
  methods: {
    onClick(item) {
      this.selectedItem = item;
      this.open = false;
      this.$emit("input", this.selectedItem.value);
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 46px;
  line-height: 46px;
  z-index: 100000;
}

.selected {
  background-color: white;
  border-radius: 4px;
  border: 1px solid #A4AEB3;
  color: #A4AEB3;
  padding-left: 10px;
  cursor: pointer;
  user-select: none;
}

.selected--border {
  border-bottom: 1px solid #A4AEB3;
  border-radius: 4px 4px 0px 0px;
}

.selected:after {
  position: absolute;
  content: "";
  top: 23px;
  right: 13px;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-color: #A4AEB3 transparent transparent transparent;
}

.items {
  border-radius: 0px 0px 4px 4px;
  overflow: hidden;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
}

.item {
  color: #A4AEB3;
  padding-left: 10px;
  cursor: pointer;
  user-select: none;
}

.item:hover {
  background-color: #FFC812;
  color: white;
}
</style>