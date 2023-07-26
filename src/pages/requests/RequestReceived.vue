<template>
  <section>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="requests && requests.length > 0 && !isLoading">
          <request-item
            v-for="request in requests"
            :key="request.id"
            :message="request.message"
            :email="request.email"
          >
          </request-item>
        </ul>
      </base-card>
      <base-card v-if="!isLoading && requests.length === 0">
        <h3>No requests received yet!</h3>
      </base-card>
    </section>
  </section>
</template>

<script>
import RequestItem from './RequestItem.vue';

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      requests: [],
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Failed to fetch requests';
      }
      this.isLoading = false;
      console.log(this.requests);
    },
    handleError() {
      this.error = null;
    },
    async fetchData() {
      this.isLoading = true;
      const userId = this.$store.getters.userId;
      const token = this.$store.getters.token;
      const response = await fetch(
        `https://vue-find-coach-dc360-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch requests!'
        );
        throw error;
      }
      const requests = [];
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: userId,
          email: responseData[key].email,
          message: responseData[key].message,
        };
        requests.push(request);
      }
      this.requests = requests;
      this.isLoading = false;
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
