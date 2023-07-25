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
  },
  actions: {
    addRequest(context, payload) {
      context.commit('addRequest', payload);
    },
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
  },
};
