<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !howToIsValid }">
      <label for="howTo">How To</label>
      <input
        type="text"
        id="howTo"
        v-model.trim="howTo"
        @blur="clearValidity('howTo')"
      />
      <p v-if="!howToIsValid">How To must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lineIsValid }">
      <label for="line">Command Line</label>
      <input
        type="text"
        id="line"
        v-model.trim="line"
        @blur="clearValidity('line')"
      />
      <p v-if="!lineIsValid">Command Line must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !platformIsValid }">
      <label for="platform">Platform</label>
      <input
        id="platform"
        rows="5"
        v-model.trim="platform"
        @blur="clearValidity('platform')"
      />
      <p v-if="!platformIsValid">Platform must not be empty.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Add Command</base-button>
  </form>
</template>

<script>
import { ref } from 'vue';
// import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
export default {
  emits: ['save-command'],
  setup(props, { emit }) {
    // const store = useStore();
    // const router= useRouter();
    const howTo = ref('');
    const line = ref('');
    const platform = ref('');
    const formIsValid = ref(true);
    const howToIsValid = ref(true);
    const lineIsValid = ref(true);
    const platformIsValid = ref(true);

    function validateForm() {
      formIsValid.value = true;
      if (howTo.value === '') {
        howToIsValid.value = false;
        formIsValid.value = false;
      }
      if (line.value === '') {
        lineIsValid.value = false;
        formIsValid.value = false;
      }
      if (platform.value === '') {
        platformIsValid.value = false;
        formIsValid.value = false;
      }
    }

    function submitForm() {
      validateForm();

      if (!formIsValid.value) {
        return;
      }

      const formData = {
        howTo: howTo.value,
        line: line.value,
        platform: platform.value
      };

      emit('save-command', formData);      
    }

    function clearValidity(input) {
      if (input === 'howTo' && howTo.value !== '') {
        howToIsValid.value = true;
      } else if (input === 'line' && line.value !== '') {
        lineIsValid.value = true;
      } else if (input === 'platform' && platform.value !== '') {
        platformIsValid.value = true;
      }
    }

    return {
      howTo,
      line,
      platform,
      formIsValid,
      howToIsValid,
      lineIsValid,
      platformIsValid,
      submitForm,
      clearValidity
    };
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: lightgray;
  outline: none;
  border-color: rgb(66, 97, 68);
  box-shadow: 0 2px 20px rgb(66, 97, 68);
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: rgb(66, 97, 68) solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
