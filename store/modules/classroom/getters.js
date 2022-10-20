export default {
  classroom(state) {
    return state.classroom
  },
  students(state) {
    return state.classroom.students ? state.classroom.students : []
  },
  quizzes(state) {
    return state.classroom.quizzes ? state.classroom.quizzes : []
  }
};
