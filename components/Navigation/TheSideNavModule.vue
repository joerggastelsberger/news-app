<template>
  <section>
    <ul class="nav-list">
      <li
        v-for="item in items"
        :key="item.key"
        @click="selectItem(item.key)"
        class="nav-item"
        :class="{ highlight: item.key == selectedItem }"
      >
        {{ item.name }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    isCategory: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    selectedItem() {
      if (this.isCategory) {
        return this.$store.getters.category;
      } else {
        return this.$store.getters.country;
      }
    },
  },
  methods: {
    selectItem(key) {
      if (this.isCategory) {
        this.$store.dispatch("setCategory", key);
      } else {
        this.$store.dispatch("setCountry", key);
      }
      this.$emit("close");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
}

.nav-item {
  margin: 3px 0;
  cursor: pointer;
}

.nav-item:hover {
  color: #ffd200;
}

.highlight {
  color: #ffd200;
}
</style>