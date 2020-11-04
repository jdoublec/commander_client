<template>
  <li>
    <h3 class="easy-eye-text">{{ howToDesc }}</h3>
    <h4 class="easy-eye-text">{{ lineDesc }}</h4>
    <h4 class="easy-eye-text">{{ platformDesc }}</h4>
    <div class="actions">
      <base-button @click="copyCommand">Copy Command</base-button>
    <!-- </div>
    <div class="actions"> -->
      <base-button mode="alert" @click="deleteCommand">X</base-button>
    </div>
  </li>
</template>

<script>
// import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
export default {
  props: ['id', 'howTo', 'line', 'platform', 'commands'],
  emits: [ 'delete-command' ],
  setup(props, { emit }) {
    // const store = useStore();
    // const router = useRouter();
    // const howToDesc = props.howTo;
    // const lineDesc = props.line;
    // const platformDesc = props.platform;

    async function copyCommand() {
      // document.execCommand(props.line);
      try {
        await navigator.clipboard.writeText(props.line);
      } catch (err) {
        console.log(err);
      }
    }

    function deleteCommand() { 
      emit('delete-command', props.id);
    }

    return {idDesc: props.id, howToDesc: props.howTo, lineDesc: props.line, platformDesc: props.platform, copyCommand, deleteCommand}
  },
  // computed: {
  //   copyCommand() {
  //     console.log(this.line);
  //     return this.line;
  //   },
  // },
  methods: {
    // copyCommand() {
    // console.log(this.line);
    // // document.execCommand(this.line);
    // }
  },
};
</script>

<style scoped>
.easy-eye-text {
  color: lightgray;
}

li {
  margin: 1rem 0;
  border: 1px solid rgb(66, 97, 68);
  /* box-shadow: 0 2px 5px #1e1d58; */
  /* border: 1px solid  white; */
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
