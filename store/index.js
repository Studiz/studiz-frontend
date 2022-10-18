import Vuex from 'vuex'
import authModule from './modules/auth'
import themeModule from './modules/theme'
import classroomModule from './modules/classroom'
import createQuizModule from './modules/createQuiz'
import quizModule from './modules/quiz'

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      auth: authModule,
      theme: themeModule,
      classroom: classroomModule,
      createQuiz: createQuizModule,
      quiz: quizModule
    },

    state: {
      isLoading: false,
      isAlertActive: false,
      alertInfo: {
        type: '',
        message: ''
      }
    },

    getters: {
      isLoading: (state) => state.isLoading,
    },

    mutations: {
      TOGGLE_LOADING(state, payload) {
        state.isLoading = payload
      },
      TOGGLE_ALERT(state, payload) {
        state.isAlertActive = true
        state.alertInfo.type = payload.type
        state.alertInfo.message = payload.message
        setTimeout(() => {
          state.alertInfo.type = ''
          state.alertInfo.message = ''
          state.isAlertActive = false
        }, 3000)
      }
    },

    actions: {},
  })
}

export default createStore
