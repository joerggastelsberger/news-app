<template>
  <div class="header-container">
    <header class="the-header">
      <TheSideNavToggle data-cy="toggle" @toggle="$emit('side-nav-toggle')" />
      <div class="spacer">
        <nuxt-link data-cy="home" to="/" class="home"><span class="material-icons">home</span></nuxt-link>
      </div>
      <div class="search">
        <span
          data-cy="search"
          class="material-icons"
          @click="$emit('modal-open')"
          >search</span
        >
      </div>
    </header>
  </div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle,
  },
};
</script>


<style scoped>
.header-container {
  height: 60px;
  display: flex;
  justify-content: center;
}

.the-header {
  width: 100%;
  max-width: 1320px;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.spacer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home {
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
  text-align: center;
  cursor: pointer;
}

.material-icons {
  font-size: 2rem;
  font-weight: 1000;
  cursor: pointer
}
</style>