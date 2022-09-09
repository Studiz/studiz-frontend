import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const defaultState = {
  quizTemplate: {
    title: '',
    description: '',
    tags: [],
    image: 'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/Studiz_logo.svg?alt=media&token=2cce045c-f6ba-4275-a81d-656343885abc',
    questions: [],
    lastUpdated: ''
  },
  imageQuizFile: null,
  imageQuestionFiles: [],
}

const inBrowser = typeof window !== 'undefined';
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.page : defaultState;

export default {
  state,
  actions,
  mutations,
  getters
}
