import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const defaultState = {
  pinCode: '',
  quizData: null,
  currentPage: 1,
  pickedItemList: [],
}

const inBrowser = typeof window !== 'undefined'
// if in browser, use pre-fetched state injected by SSR
const state =
  inBrowser && window.__INITIAL_STATE__
    ? window.__INITIAL_STATE__.page
    : defaultState

export default {
  state,
  actions,
  mutations,
  getters,
}
