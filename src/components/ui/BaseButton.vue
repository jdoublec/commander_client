<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false ,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }
    }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color:rgb(66, 97, 68);
  border: 1px solid rgb(66, 97, 68);
  color:lightgray;
  cursor: pointer;
  border-radius: 12px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: rgb(83, 100, 85);
  border-color: rgb(83, 100, 85);
}

.flat {
  background-color: transparent;
  color:rgb(66, 97, 68);
  border: none;
}

.outline {
  background-color: transparent;
  border-color:rgb(66, 97, 68);
  color: rgb(66, 97, 68);
}

.edit {
  background-color: transparent;
  border-color: rgb(66, 97, 68);
  color:rgb(66, 97, 68);
}

.alert {
  background-color: transparent;
  border-color: tomato;
  color: tomato;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: rgb(25, 26, 25);
}
</style>