<template>
  <div class="sidenav-container">
    <transition name="opacity">
      <div v-if="show" class="sidenav-backdrop" @click="$emit('close')"></div>
    </transition>
    <transition name="slide-nav">
      <div v-if="show" class="sidenav background-dark">
        <transition-group name="slide-nav-module">
          <h2
            data-cy="nav-title-categories"
            class="nav-title"
            @click="showCategories = !showCategories"
            key="nav-title-categories"
          >
            Categories
          </h2>
          <the-side-nav-module
            data-cy="nav-list-categories"
            v-if="showCategories"
            key="nav-list-categories"
            :items="categories"
            :isCategory="true"
            @close="$emit('close')"
          ></the-side-nav-module>
          <h2
            data-cy="nav-title-countries"
            class="nav-title"
            @click="showCountries = !showCountries"
            key="nav-title-countries"
          >
            Countries
          </h2>
          <the-side-nav-module
            data-cy="nav-list-countries"
            v-if="showCountries"
            key="nav-list-countries"
            :items="countries"
            :isCategory="false"
            @close="$emit('close')"
          ></the-side-nav-module>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import TheSideNavModule from "@/components/Navigation/TheSideNavModule.vue";

export default {
  name: "TheSidenav",
  components: {
    TheSideNavModule,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      categories: [
        { key: "breaking-news", name: "Breaking News" },
        { key: "business", name: "Business" },
        { key: "science", name: "Science" },
        { key: "sports", name: "Sports" },
        { key: "technology", name: "Technology" },
        { key: "health", name: "Health" },
        { key: "entertainment", name: "Entertainment" },
      ],
      countries: [
        { key: "au", name: "Australia" },
        { key: "br", name: "Brazil" },
        { key: "ca", name: "Canada" },
        { key: "ch", name: "Switzerland" },
        { key: "cn", name: "China" },
        { key: "de", name: "Germany" },
        { key: "eg", name: "Egypt" },
        { key: "fr", name: "France" },
        { key: "gb", name: "United Kingdom" },
        { key: "gr", name: "Greece" },
        { key: "hk", name: "Hong Kong" },
        { key: "ie", name: "Ireland" },
        { key: "il", name: "Israel" },
        { key: "in", name: "India" },
        { key: "it", name: "Italy" },
        { key: "jp", name: "Japan" },
        { key: "nl", name: "Netherlands" },
        { key: "no", name: "Norway" },
        { key: "pe", name: "Peru" },
        { key: "ph", name: "Philippines" },
        { key: "pk", name: "Pakistan" },
        { key: "pt", name: "Portugal" },
        { key: "ro", name: "Romania" },
        { key: "ru", name: "Russian Federation" },
        { key: "se", name: "Sweden" },
        { key: "sg", name: "Singapore" },
        { key: "tw", name: "Taiwan" },
        { key: "ua", name: "Ukraine" },
        { key: "us", name: "United States of America" },
      ],
      showCategories: true,
      showCountries: true,
    };
  },
  created() {
    this.categories.sort((a, b) => a.name.localeCompare(b.name));
    this.countries.sort((a, b) => a.name.localeCompare(b.name));
  },
};
</script>

<style scoped>
.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.sidenav {
  height: 100%;
  background-color: white;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  box-shadow: 4px 8px 24px 8px rgba(0, 0, 0, 0.7);
  padding: 40px 40px 10px 40px;
  overflow: auto;
}

@media (min-width: 768px) {
  .sidenav {
    padding: 60px 60px 20px 60px;
  }
}

.slide-nav-enter-active,
.slide-nav-leave-active {
  transition: all 0.3s ease-out;
}
.slide-nav-enter,
.slide-nav-leave-to {
  transform: translateX(-100%);
}

.slide-nav-module-enter {
  opacity: 0;
  transform: translateX(-120px);
}

.slide-nav-module-enter-active {
  transition: all 0.3s ease-out;
}

.slide-nav-module-leave-active {
  transition: all 0.3s ease-in;
  opacity: 0;
  transform: translateX(-120px);
  position: absolute;
}

.slide-nav-module-move {
  transition: transform 0.3s;
}

.nav-title {
  margin: 0 0 10px 0;
  cursor: pointer;
}

@media (min-width: 768px) {
  .nav-title {
    margin: 0 0 20px 0;
  }
}
</style>
