<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model.trim="firstName" />
    </div>

    <div class="form-control">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model.trim="lastName" />
    </div>

    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model="description"></textarea>
    </div>

    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate" />
    </div>

    <div class="form-control">
      <label for="areas">Areas of Expertise</label>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas" />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas" />
        <label for="career">Career</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      rate: null,
      areas: [],
    };
  },
  methods: {
    submitForm() {
      const coachData = {
        firstName: this.firstName,
        lastName: this.lastName,
        description: this.description,
        hourlyRate: this.rate,
        areas: this.areas,
      };
      console.log(coachData);
    },
  },
};
</script>

<style></style>
