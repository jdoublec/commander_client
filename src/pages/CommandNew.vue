<template>
  <section>
    <base-card>
      <h2>Add a new Command</h2>
      <command-form
        :editMode="false"
        @save-command="saveCommand"
      ></command-form>
    </base-card>
  </section>
</template>

<script>
import CommandForm from '../components/commands/CommandForm.vue';
export default {
  components: {
    CommandForm
  },
  methods: {
    async saveCommand(newCommand) {
      try {
        // await store.dispatch('commands', {
        //   type: 'saveCommand',
        //   data: formData
        // });
        await this.$store.dispatch('commands/saveCommand', newCommand);
        // this.$router.replace('/commands');
        this.$router.back();
        // window.history.back();
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
