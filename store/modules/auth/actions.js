export default {
  async onAuthStateChangedAction(state, {
    authUser,
    claims
  }) {
    if (!authUser) {
      // remove state
      state.commit('setUser', null)

      //redirect from here
      this.$router.push({
        path: '/signin',
      })
    } else {
      const {
        uid,
        email
      } = authUser
      state.commit('setUser', {
        uid,
        email,
      })
    }
  },
};
