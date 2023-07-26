export default {
  state() {
    return {
      userId: null,
      tokenExpiration: null,
      token: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.tokenExpiration = payload.tokenExpiration;
    },
  },
  actions: {
    async signup(context, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDv9AtsIOCN_3g5O_fQnZ5sJxzv0Fn4oWw',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message ||
            'Failed to authenticate. Check your login data.'
        );
        throw error;
      }
      console.log(responseData);
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    },

    async login(context, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDv9AtsIOCN_3g5O_fQnZ5sJxzv0Fn4oWw',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message ||
            'Failed to authenticate. Check your login data.'
        );
        throw error;
      }
      console.log(responseData);
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    },
    logout(context) {
      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiration: null,
      });
    },
  },
};
