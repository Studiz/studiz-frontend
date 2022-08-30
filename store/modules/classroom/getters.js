export default {
  classroom(state) {
    return state.classroom
  },
  students(state) {
    return state.classroom.students ? state.classroom.students : []
  }
};
