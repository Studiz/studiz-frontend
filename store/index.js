import Vuex from 'vuex';
import authModule from './modules/auth';
import themeModule from './modules/theme';
import classroomModule from './modules/classroom';
import createQuizModule from './modules/createQuiz';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      auth: authModule,
      theme: themeModule,
      classroom: classroomModule,
      createQuiz: createQuizModule
    }
  });
};

export default createStore
