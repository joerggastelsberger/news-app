<template>
  <section class="articles">
    <article-preview
      data-cy="article-preview"
      v-for="article in articles"
      :key="article.title"
      :title="article.title"
      :encodedTitle="article.encodedTitle"
      :description="article.description"
      :url="article.url"
      :urlToImage="article.urlToImage"
      :publishedAt="article.publishedAt"
    ></article-preview>
  </section>
</template>

<script>
import ArticlePreview from "@/components/Articles/ArticlePreview.vue";

export default {
  components: {
    ArticlePreview,
  },
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.articles {
  margin: 40px 0px;
  display: grid;
  grid-template-columns: 100%;
  justify-content: center;
  grid-gap: 40px;
  max-width: 1100px;
}

@media (min-width: 460px) {
  .articles {
    margin: 40px 80px;
  }
}

@media (min-width: 768px) {
  .articles {
    margin: 40px 40px;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .articles {
    margin: 40px 80px;
    grid-gap: 80px;
  }
}

@media (min-width: 1200px) {
  .articles {
    margin: 40px 120px;
    grid-gap: 120px;
  }
} 
</style>