<template>
  <div class="modal-container">
    <transition name="opacity">
      <div v-if="show" class="modal-backdrop" @click="$emit('close')"></div>
    </transition>
    <transition name="opacity">
      <div v-if="show" class="modal background-dark">
        <form @submit.prevent="search">
          <div class="modal-title">
            <h2>Search Articles</h2>
          </div>
          <div class="modal-search-terms">
            <p>Search Terms</p>
            <AppControlInput
              data-cy="modal-search-terms"
              :placeholder="'Use quotes for exact matches, AND / OR / NOT for multiple terms, enter up to 40 alphanumeric characters'"
              v-model="searchTerms"
              :controlType="'textarea'"
            ></AppControlInput>
          </div>
          <div class="modal-sort-terms">
            <p>Sort search results by criteria (optional)</p>
            <AppDropDown
              :items="criterias"
              @input="selectedCriteria = $event"
            ></AppDropDown>
          </div>
          <div class="modal-actions">
            <AppButton
              type="button"
              btn-style="cancel"
              @click.prevent="$emit('close')"
              class="modal-actions--cancel"
              >Cancel</AppButton
            >
            <AppButton
              data-cy="modal-submit"
              type="submit"
              class="modal-actions--submit"
              :disable="$v.$invalid"
              >Search</AppButton
            >
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  helpers,
} from "vuelidate/lib/validators";
import { alphaNumeric } from "@/util/validators";

export default {
  name: "TheModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchTerms: "",
      criterias: [
        { value: "publishedAt", text: "Newest (default)" },
        { value: "relevancy", text: "Relevant" },
        { value: "popularity", text: "Popular" },
      ],
      selectedCriteria: "publishedAt",
    };
  },
  validations: {
    searchTerms: {
      required,
      regex: (val) => {
        return alphaNumeric(val);
      },
      minLength: minLength(1),
      maxLength: maxLength(40),
    },
  },
  methods: {
    search() {
      this.$store.dispatch("setSearch", {
        searchTerms: this.searchTerms,
        criteria: this.selectedCriteria,
      });
      this.searchTerms = "";
      this.selectedCriteria = "publishedAt";
      this.$store.dispatch("resetCriterias");
      this.$emit("close");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.modal-container {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.modal-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.modal {
  position: fixed;
  z-index: 10000;
  right: 0;
  top: 25%;
  left: 0;
  margin: auto;
  width: 83%;
  padding: 50px;
  box-shadow: 4px 8px 24px 8px rgba(0, 0, 0, 0.7);
  border-radius: 4px;
}

/* @media (min-width: 460px) {
  .article-preview {
    box-shadow: 4px 8px 24px 8px #232526;
  }
} */

@media (min-width: 768px) {
  .modal {
    top: 31%;
    width: 60%;
  }
}

@media (min-width: 1024px) {
  .modal {
    top: 18%;
    width: 47%;
    max-width: 600px;
  }
}

.modal-title h2 {
  margin: 0;
}

.modal-search-terms {
  margin: 20px 0;
}

.modal-search-terms p {
  margin: 10px 0;
  color: white;
}

.modal-search-terms input {
  width: 100%;
}

.modal-sort-terms {
  margin: 30px 0;
}

.modal-sort-terms p {
  margin: 10px 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.modal-actions--cancel {
  margin: 0 10px 0 0;
}

.modal-actions--submit {
  z-index: 10000;
}
</style>
