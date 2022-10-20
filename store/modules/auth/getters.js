export default {
  user(state) {
    return state.user ? state.user.data : null
  },
  userId(state) {
    return state.user ? state.user.id : ''
  },
  userRole(state) {
    return state.user ? state.user.data.role : ''
  },
  userEmail(state) {
    return state.user ? state.user.data.email : ''
  },
  classRooms(state) {
    return state.user ? state.user.data.classrooms : []
  },
};
