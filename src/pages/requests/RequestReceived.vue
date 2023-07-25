<template>
  <section>
    <base-card v-if="requests && requests.length > 0">
      <h2>Requests Received</h2>
      <ul>
        <request-item
          v-for="request in requests"
          :key="request.id"
          :message="request.message"
          :email="request.email"
        >
        </request-item>
      </ul>
    </base-card>
    <base-card v-else>
      <h3>No requests received yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from './RequestItem.vue';

export default {
  components: {
    RequestItem,
  },
  computed: {
    requests() {
      return this.$store.getters['requests/requests'];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
