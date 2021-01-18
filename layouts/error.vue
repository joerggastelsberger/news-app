<template>
  <div class="error-page">
    <h1>Sorry...</h1>
    <p>You will be redirected in two seconds</p>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      this.$router.push("/");
    }, 2000);
  },
};
</script>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>