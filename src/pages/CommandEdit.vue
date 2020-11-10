<template>
  <section>
    <base-card>
      <h2>Edit a Command</h2>
      <command-form
        :howTo="selectedCommand.howTo"
        :line="selectedCommand.line"
        :platform="selectedCommand.platform"
        :editMode="true"
        @update-command="updateSelectedCommand"
      ></command-form>
    </base-card>
  </section>
</template>

<script>
import CommandForm from '../components/commands/CommandForm.vue';
export default {
  props: ['id'],
  data() {
    return {
      selectedCommand: null
    };
  },
  components: {
    CommandForm
  },
  created() {
    this.getSelectedCommand();
  },
  methods: {
    getSelectedCommand() {
        this.$store.dispatch('commands/updateSelectedCommandId', this.id);
        this.selectedCommand = this.$store.getters['commands/getSelectedCommand'];
    },
    async updateSelectedCommand(updatedCommand) {
      try {
        await this.$store.dispatch('commands/updateSelectedCommand', updatedCommand);
        this.$router.back();
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
