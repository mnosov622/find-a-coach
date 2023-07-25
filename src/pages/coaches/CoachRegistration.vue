<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @submit="submit"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from './CoachForm.vue';
export default {
  components: {
    CoachForm,
  },

  methods: {
    submit(data) {
      this.$store.dispatch('coaches/addCoach', data);
      this.$router.replace('/coaches');
    },
  },
};
</script>
