<template>
  <div>
    <TheHeader
      @side-nav-toggle="displaySideNav = !displaySideNav"
      @modal-open="displayModal = !displayModal"
    />
    <TheSideNav
      data-cy="sidenav"
      :show="displaySideNav"
      @close="displaySideNav = false"
    />
    <TheModal
      data-cy="modal"
      :show="displayModal"
      @close="displayModal = false"
    />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader.vue";
import TheSideNav from "@/components/Navigation/TheSideNav.vue";
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle.vue";
import TheModal from "@/components/Navigation/TheModal.vue";

export default {
  components: {
    TheHeader,
    TheSideNav,
    TheSideNavToggle,
    TheModal,
  },
  data() {
    return {
      displaySideNav: false,
      displayModal: false,
    };
  },
};
</script>
<style>
html {
  font-family: "Open Sans", "sans-serif";
}

body {
  margin: 0;
  background: #f7971e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #ffd200,
    #f7971e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffd200,
    #f7971e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-attachment: fixed;
  color: white;
}

.material-icons {
  color: white;
}
</style>
