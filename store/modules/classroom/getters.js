export default {
  classroom(state) {
    return state.classroom
  },
  students(state) {
    return state.classroom?.students ? state.classroom.students : []
  },
  quizHistories(state) {
    return state.classroom?.quizHistories ? state.classroom.quizHistories : []
  }
};
