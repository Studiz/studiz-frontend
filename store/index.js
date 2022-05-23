import Vuex from 'vuex'
import auth from './module/auth'

export default new Vuex.Store({
  modules: {
    auth
  },
  state: {
    themeIcon: '',
    themeName: ''
  },
  actions: {},

  mutations: {
    SET_THEME_MODE(state, value) {
      state.themeIcon = value.icon
      state.themeName = value.title
    }
  },

  getters: {
    themeIcon(state) {
      return state.themeIcon
    },
    themeName(state) {
      return state.themeName
    }
  }

})
