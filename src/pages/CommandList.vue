<template>
  <div>
    <base-dialog
      :show="!!error"
      :title="title"
      @close="handleError"
      :dialogType="errorType"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <command-filter
        :commands="allCommands"
        @change-filter="setFilter"
        @change-keyword="setKeyword"
        @change-sort="setSort"
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
import BaseCard from '../components/ui/BaseCard.vue';
// import { computed } from 'vue';
// import { useStore } from 'vuex';
export default {
  components: {
    CommandItem,
    CommandFilter,
    BaseCard
  },
  data() {
    return {
      selectedId: null,
      title: '',
      error: null,
      errorType: '',
      activeFilter: '',
      activeKeyword: '',
      activeSort: ''
    };
  },
  created() {
    this.loadData();
  },
  mounted: function() {
    this.getFilter();
    this.getKeyword();
    this.getSort();
  },
  computed: {
    allCommands() {
      return this.$store.getters['commands/getCommands'];
    },
    filteredCommands() {
      const commands = this.allCommands;
      const filteredPlatform = this.activeFilter.toLowerCase();
      const keyword = this.activeKeyword.toLowerCase();
      const filtered = commands.filter(command => {
        const platform = command.platform.toLowerCase();
        if (
          !this.activeFilter ||
          this.activeFilter.trim === '' ||
          platform.includes(filteredPlatform)
        ) {
          return true;
        }
        return false;
      });

      const keyworded = filtered.filter(command => {
        const howTo = command.howTo.toLowerCase();
        const line = command.line.toLowerCase();
        const platform = command.platform.toLowerCase();
        if (
          !this.activeKeyword ||
          this.activeKeyword.trim === '' ||
          howTo.includes(keyword) ||
          line.includes(keyword) ||
          platform.includes(keyword)
        ) {
          return true;
        }
        return false;
      });

      if (this.activeSort === '') {
        return keyworded;
      } else {
        return keyworded.sort((a, b) =>
          a[this.activeSort].localeCompare(b[this.activeSort])
        );
      }
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
    getKeyword() {
      this.activeKeyword = this.$store.getters['commands/getCommandKeyword'];
    },
    setKeyword(keyword) {
      this.$store.dispatch('commands/updateCommandKeyword', keyword);
      this.activeKeyword = keyword;
    },
    getSort() {
      this.activeSort = this.$store.getters['commands/getCommandSort'];
    },
    setSort(sort) {
      this.$store.dispatch('commands/updateCommandSort', sort);
      this.activeSort = sort;
    },
    async loadData() {
      try {
        await this.$store.dispatch('commands/loadCommands');
      } catch (error) {
        this.errorType = 'close';
        this.error = error.message || 'Could not load Commands!';
      }
    },
    deleteCommand(id, howTo) {
      this.selectedId = id;
      this.title = 'Delete Command!!!';
      this.errorType = 'delete';
      this.error = `Do you want to delete Command '${howTo}'?`;
    },
    async deleteCommandConfirmed() {
      try {
        await this.$store.dispatch('commands/deleteCommand', this.selectedId);
        this.$store.getters['commands/getCommands'];
      } catch (err) {
        console.log(err);
      }
    },
    handleError(response = false) {
      if (response) {
        this.deleteCommandConfirmed();
      }
      this.selectedId = null;
      this.title = '';
      this.errorType = '';
      this.error = null;
    }
  }
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
