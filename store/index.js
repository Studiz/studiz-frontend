const actions = {
  async onAuthStateChangedAction(state, {
    authUser,
    claims
  }) {
    if (!authUser) {
      // remove state
      state.commit('SET_USER', null)

      //redirect from here
      this.$router.push({
        path: '/signin',
      })
    } else {
      const {
        uid,
        email
      } = authUser
      state.commit('SET_USER', {
        uid,
        email,
      })
    }
  },
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_THEME_MODE(state, value) {
    state.themeIcon = value.icon
    state.themeName = value.title
    console.log(value.icon);
  }
}

const state = () => ({
  user: null,
  themeIcon: '',
  themeName: ''
})

const getters = {
  getUser(state) {
    return state.user
  },
  themeIcon(state) {
    return state.themeIcon
  },
  themeName(state) {
    return state.themeName
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
}