export const state = () => ({
  user: 'asdsad',
})

export const getters = {
  user: state => state.user,
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setPass(state, user) {
    state.user = user
  }
}
export default {
  state,
  getters,
  // actions,
  mutations
}
