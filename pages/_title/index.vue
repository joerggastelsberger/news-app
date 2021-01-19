<template>
  <div data-cy="article-details" class="single-article-page">
    <section class="article background-dark">
      <div class="article-image" :style="articleImage"></div>
      <div class="article-text">
        <h2 class="article-title">{{ loadedArticle.title }}</h2>
        <div class="article-details">
          <div class="article-detail">
            Source {{ loadedArticle.source.name }}
          </div>
          <div class="article-detail">
            Published at {{ loadedArticle.publishedAt | date }}
          </div>
        </div>
        <p class="article-content">{{ loadedArticle.content }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: ["check-article"],
  computed: {
    loadedArticle() {
      return this.$store.getters.loadedArticle;
    },
    articleImage() {
      return this.loadedArticle.image
        ? { backgroundImage: `url(${this.loadedArticle.image})` }
        : {
            backgroundImage: `url(${require("@/assets/images/background-main.jpg")})`,
          };
    },
  },
};
</script>

<style scoped>
.single-article-page {
  padding: 40px 0;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .single-article-page {
    padding: 40px 60px 60px 60px;
  }
}

.article {
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
}

@media (min-width: 768px) {
  .article {
    box-shadow: 4px 8px 24px 8px #232526;
  }
}

.article-image {
  width: 100%;
  height: 240px;
  background-position: center;
  background-size: cover;
  border-radius: 5px 5px 0 0;
}

@media (min-width: 768px) {
  .article-image {
    height: 440px;
  }
}

.article-text {
  padding: 40px 10px;
}

.article-title {
  margin: 0;
}

@media (min-width: 768px) {
  .article-text {
    padding: 40px 40px;
  }

  .article-title {
    font-size: 2rem;
    margin: 0 40px;
  }
}

.article-details {
  margin: 20px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .article-details {
    flex-direction: row;
  }
}

.article-detail {
  color: #898d91;
  margin: 1px 20px;
}

@media (min-width: 768px) {
  .article-detail {
    color: #898d91;
    margin: 0 20px;
  }
}

.article-content {
  margin: 0;
}

@media (min-width: 768px) {
  .article-content {
    margin: 0 20px;
  }
}
</style>

