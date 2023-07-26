<template>
  <form @submit.prevent="sendMessage">
    <div class="form-control">
      <label for="email">Your email</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Your message</label>
      <textarea id="message" rows="5" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">
      Please enter a valid email and non empty message
    </p>
    <div class="actions">
      <base-button>Send message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    sendMessage() {
      this.formIsValid = true;

      if (this.email !== '' && this.message !== '') {
        const newRequest = {
          email: this.email,
          message: this.message,
        };
        this.email = '';
        this.message = '';
        this.formIsValid = true;
        this.$store.dispatch('requests/addRequest', newRequest);
        this.$router.replace('/requests');
      } else {
        this.formIsValid = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
