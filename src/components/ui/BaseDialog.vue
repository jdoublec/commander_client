<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="singleButton">
          <slot name="actions">
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>
        <menu v-else-if="doubleButton">
          <slot name="actions">
            <base-button mode="alert" class="test" @click="tryClose(true)">Yes</base-button>
            <base-button @click="tryClose(false)">Cancel</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    dialogType: {
      type: String,
      required: false,
      default: ''
    },
  },
  emits: ['close'],
  computed: {
    singleButton() {
      if (this.dialogType === 'close') {
        return true;
      }
      return false;
    },
    doubleButton() {
      if (this.dialogType === 'delete') {
        return true;
      }
      return false;
    }
  },
  methods: {
    tryClose(response = false) {
      if (!this.singleButton && !this.doubleButton) {
        return;
      } else if (response) {
        this.$emit('close', response);
      } else {
        this.$emit('close');
      }
    }
  }
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  /* background-color: rgb(66, 97, 68); */
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgb(66, 97, 68);
  padding: 0;
  margin: 0;
  overflow: hidden;
  color: lightgray;
  background-color: rgb(41, 41, 44);
}

.test {
  background-color:  rgb(41, 41, 44);
  color: tomato;
}

header {
  background-color: rgb(66, 97, 68);
  color: lightgray;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.5s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
