<template>
  <div class="landing-page">
    <div
      v-if="loadedArticles.length > 0"
      class="article-list"
      key="article-list"
    >
      <article-list
        data-cy="article-list"
        :articles="loadedArticles"
        :key="loadedArticles.length"
      ></article-list>
    </div>
    <div v-else class="article-list-empty" key="article-list-empty">
      <p>No matching results found.</p>
      <p>You will be redirected in two seconds.</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loadedArticles() {
      if (this.$store.getters.loadedArticles.length == 0) {
        setTimeout(() => {
          this.$store.dispatch("setCountry", "us");
        }, 2000);
      }
      return this.$store.getters.loadedArticles;
    },
  },
};
</script>

<style scoped>
@media (min-width: 1200px) {
  .landing-page {
    display: flex;
    justify-content: center;
  }
}

.article-list-empty {
  text-align: center;
}
</style>