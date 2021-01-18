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
        { key: "business", name: "Business" },
        { key: "entertainment", name: "Entertainment" },
        { key: "general", name: "General" },
        { key: "health", name: "Health" },
        { key: "science", name: "Science" },
        { key: "sports", name: "Sports" },
        { key: "technology", name: "Technology" },
      ],
      countries: [
        { key: "ae", name: "United Arab Emirates" },
        { key: "ar", name: "Argentinia" },
        { key: "at", name: "Austria" },
        { key: "au", name: "Australia" },
        { key: "be", name: "Belgium" },
        { key: "bg", name: "Bulgaria" },
        { key: "br", name: "Brazil" },
        { key: "ca", name: "Canada" },
        { key: "ch", name: "Switzerland" },
        { key: "cn", name: "China" },
        { key: "co", name: "Colombia" },
        { key: "cu", name: "Cuba" },
        { key: "cz", name: "Czechia" },
        { key: "de", name: "Germany" },
        { key: "eg", name: "Egypt" },
        { key: "fr", name: "France" },
        { key: "gb", name: "United Kingdom" },
        { key: "gr", name: "Greece" },
        { key: "hk", name: "Hong Kong" },
        { key: "hu", name: "Hungary" },
        { key: "id", name: "Indonesia" },
        { key: "ie", name: "Ireland" },
        { key: "il", name: "Israel" },
        { key: "in", name: "India" },
        { key: "it", name: "Italy" },
        { key: "jp", name: "Japan" },
        { key: "kr", name: "Korea" },
        { key: "lt", name: "Lithuania" },
        { key: "lv", name: "Latvia" },
        { key: "ma", name: "Morocco" },
        { key: "my", name: "Malaysia" },
        { key: "ng", name: "Nigeria" },
        { key: "nl", name: "Netherlands" },
        { key: "no", name: "Norway" },
        { key: "nz", name: "New Zealand" },
        { key: "ph", name: "Philippines" },
        { key: "pl", name: "Poland" },
        { key: "ro", name: "Romania" },
        { key: "rs", name: "Serbia" },
        { key: "ru", name: "Russian Federation" },
        { key: "sa", name: "Saudi Arabia" },
        { key: "se", name: "Sweden" },
        { key: "sg", name: "Singapore" },
        { key: "si", name: "Slovenia" },
        { key: "sk", name: "Slovakia" },
        { key: "th", name: "Thailand" },
        { key: "tr", name: "Turkey" },
        { key: "tw", name: "Taiwan" },
        { key: "ua", name: "Ukraine" },
        { key: "us", name: "United States of America" },
        { key: "ve", name: "Venezuela" },
        { key: "za", name: "Zambia" },
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
  padding: 60px 60px 20px 60px;
  overflow: auto;
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
  margin: 0 0 20px 0;
  cursor: pointer;
}
</style>
