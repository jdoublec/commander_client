<template>
  <base-card>
    <div class="header-div">
    <h2>Find Your Command</h2>
    <base-button mode="outline" class="button" @click="clearFilters">Clear</base-button>
    </div>
    <span class="filter-option">
      <label for="platform">Platform:</label>
      <select id="platform" :value="defaultFilter" @change="setFilter">
        <option></option>
        <option
          v-for="platform in platforms"
          :key="platform"
          :value="platform"
          >{{ platform }}</option
        >
      </select>
      <label for="keyword">Keyword:</label>
      <input type="text" id="keyword" :value="defaultKeyword" @input="findKeyword"  />
      <label for="sort">Sort:</label>
      <select id="sort" :value="defaultSort" @change="setSort">
        <option></option>
        <option value="howTo">How To</option>
        <option value="line">Line</option>
        <option value="platform">Platform</option>
      </select>
    </span>
  </base-card>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  props: ['commands'],
  emits: ['change-filter', 'change-keyword', 'change-sort'],
  computed: {
    platforms() {
      // return [...new Set(this.commands.map(command => command.platform))];
      var platforms = [];
      for (let command of this.commands) {
        const lcPlatform = command.platform.toLowerCase();
        var platformFound = false;
        if (platforms.length > 0) {
          for (let i = 0; i < platforms.length; i++) {
            if (platforms[i].toLowerCase() === lcPlatform.toString()) {
              platformFound = true;
              break;
            }
          }
        }
        if (!platforms || !platformFound) {
          platformFound = false;
          platforms.push(command.platform);
        }
      }

      return platforms;
    },
    defaultFilter() {
      return this.$store.getters['commands/getCommandFilter'];
    },
    defaultKeyword() {
      return this.$store.getters['commands/getCommandKeyword'];
    },
    defaultSort() {
      return this.$store.getters['commands/getCommandSort'];
    }
  },
  methods: {
    setFilter(event) {
      this.$emit('change-filter', event.target.value);
    },
    findKeyword(event) {
      this.$emit('change-keyword', event.target.value);
    },
    setSort(event) {
      this.$emit('change-sort', event.target.value);
    },
    clearFilters() {
      this.$emit('change-filter', event.target.value);
      this.$emit('change-keyword', event.target.value);
      this.$emit('change-sort', event.target.value);
    }
  }
};
</script>

<style scoped>

.header-div {
  width: 100%;
  padding-bottom: 1rem;
}

h2 {
  display: inline;
  width: 50%;
  padding-left: 0.25rem;
  margin: 0.5rem 0;
  text-align: left;
}

.button {
  display: inline;
  float: right;
  padding: 0.25rem 1.5rem;
}

/* .filter-option { */
  /* margin-left: 1rem;  */
  /* margin-right: 1rem; */
/* } */

.filter-option label,
.filter-option select {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option select,
.filter-option input {
  margin-left: 0.25rem;
  width: 27%;
  background-color: lightgray;
}

.filter-option > #sort {
  /* margin-left: 0.25rem; */
  width: 12%;
  /* background-color: lightgray; */
}

.filter-option.active label {
  font-weight: bold;
}
</style>
