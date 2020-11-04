<template>
  <base-card>
    <h2>Find Your Command</h2>
    <span class="filter-option">
      <label for="platform">Platform:</label>
      <select id="platform" :value="defaultValue" @change="setFilter">      
          <option></option>
          <option v-for="platform in platforms" :key="platform" :value="platform" >{{ platform }}</option>
      </select>
    </span>    
  </base-card>
</template>

<script>
export default {
    props: ['commands'],
    emtis: ['change-filter'],
    data() {
        return {
            filters: ''       
        };
    },
    computed: {
        platforms() {            
            return [...new Set(this.commands.map(command => command.platform))];
        },    
        defaultValue() {
          return this.$store.getters['commands/getCommandFilter'];
        }    
    },
    methods: {
        setFilter(event) {
            const updatedFilters = event.target.value;
            this.filters = updatedFilters;
            this.$emit('change-filter', updatedFilters);
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;  
  text-align: center;
}

.filter-option {
  margin-left: 1rem; 
  margin-right: 1rem;
}

.filter-option label,
.filter-option select {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option select {
    margin-left: 1rem;
    width: 15rem;
    background-color: lightgray;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
