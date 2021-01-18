<template>
  <div @click="onClick" class="article-preview background-dark">
    <article>
      <div class="article-image" :style="articleImage"></div>
      <div class="article-content">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    encodedTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    urlToImage: {
      type: String,
      required: false,
    },
    publishedAt: {
      type: String,
      required: false,
    },
  },
  computed: {
    articleImage() {
      return this.urlToImage
        ? { backgroundImage: `url(${this.urlToImage})` }
        : {
            backgroundImage: `url(${require("@/assets/images/background-main.jpg")})`,
          };
    },
  },
  methods: {
    onClick() {
      this.$store.dispatch("setArticle", this.encodedTitle);
      this.$router.push(`/${this.encodedTitle}`);
    },
  },
};
</script>

<style scoped>
.article-preview {
  border-radius: 4px;
  cursor: pointer;
}

@media (min-width: 460px) {
  .article-preview {
    box-shadow: 4px 8px 24px 8px #232526;
  }

  .article-preview:hover {
  box-shadow: 4px 8px 24px 10px #232526;
}
}

.article-image {
  width: 100%;
  height: 240px;
  background-position: center;
  background-size: cover;
  border-radius: 4px 4px 0 0;
}

.article-content {
  padding: 20px;
  text-align: center;
}

.article-content h2 {
  margin: 20px;
}

.article-content p {
  margin: 20px 0px;
  color: #A4AEB3;
}

a:hover .article-content,
a:active .article-content {
  background-color: #ccc;
}
</style>