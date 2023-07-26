export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async addRequest(context, payload) {
      const userId = context.rootGetters.userId;

      const response = await fetch(
        `https://vue-find-coach-dc360-default-rtdb.firebaseio.com/requests/${userId}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to send request!'
        );
        throw error;
      }

      payload.id = responseData.name;
      payload.coachId = userId;
      context.commit('addRequest', payload);
    },
    async fetchRequests(context) {
      const userId = context.rootGetters.userId;
      const token = context.rootGetters.token;
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
      console.log('requests: ', requests);
      context.commit('setRequests', requests);
    },
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      console.log(state.requests.filter((req) => req.coachId === coachId));
    },
  },
};
