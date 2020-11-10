<template>
  <div>
    <section>
      <command-filter
        :commands="allCommands"
        @change-filter="setFilter"
      ></command-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadData()">Refresh</base-button>
          <base-button link to="/new">New Command</base-button>
        </div>
        <!-- <ul v-if="hasCommands"> -->
        <ul>
          <command-item
            v-for="command in filteredCommands"
            :key="command.id"
            :id="command.id"
            :how-to="command.howTo"
            :line="command.line"
            :platform="command.platform"
            :commands="filteredCommands"
            @delete-command="deleteCommand"
          ></command-item>
        </ul>
        <!-- <h3 v-else>No Commands Found.</h3> -->
      </base-card>
    </section>
  </div>
</template>

<script>
import CommandItem from '../components/commands/CommandItem.vue';
import CommandFilter from '../components/commands/CommandFilter.vue';
// import { computed } from 'vue';
// import { useStore } from 'vuex';
export default {
  components: {
    CommandItem,
    CommandFilter
  },
  data() {
    return {
      activeFilter: ''
    };
  },
  created() {
    this.loadData();
  },
  mounted: function() {
    this.getFilter();
  },
  computed: {
    allCommands() {
      return this.$store.getters['commands/getCommands'];
    },
    filteredCommands() {
      // console.log('filteredCommands ' + this.activeFilter);
      const commands = this.allCommands;
      return commands.filter(command => {
        if (
          !this.activeFilter ||
          this.activeFilter.trim === '' ||
          command.platform.includes(this.activeFilter) // === this.activeFilter
        ) {
          return true;
        }
        return false;
      });
    }
  },
  methods: {
    getFilter() {
      this.activeFilter = this.$store.getters['commands/getCommandFilter'];
    },
    setFilter(updatedFilter) {
      this.$store.dispatch('commands/updateCommandFilter', updatedFilter);
      this.activeFilter = updatedFilter;
    },
    async loadData() {
      try {
        await this.$store.dispatch('commands/loadCommands');
      } catch (error) {
        this.error = error.message || 'Could not load Commands!';
        console.log(this.error);
      }
    },
    async deleteCommand(id) {
      try {
        await this.$store.dispatch('commands/deleteCommand', id);
        this.$store.getters['commands/getCommands'];
        // this.allCommands;
        // this.filteredCommands;
      } catch (err) {
        console.log(err);
      }
    }
  }
  // setup() {
  //   const store = useStore();

  //   loadData();

  //   async function loadData() {
  //     try {
  //       // await store.dispatch.loadCommands;//('loadCommands');
  //       console.log('loading');
  //       await store.dispatch('loadCommands');
  //     } catch (error) {
  //       this.error = error.message || 'Could not load Commands!';
  //     }
  //   }

  //   const commands = computed(function() {
  //     return store.getters.getCommands;
  //   })

  //   const hasCommands = computed(function() {
  //     return store.getters.hasCommands;
  //   })

  //   return { filteredCommands: commands, hasCommands }
  // }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
