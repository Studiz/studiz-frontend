export default {
  SET_NOTIFICATION(state, notifications) {
    state.notifications = notifications
  },

  READED_NOTIFICATION(state, payload) {
    state.notifications[payload].isRead = true
  },

  DELETE_NOTIFICATION(state, payload) {
    state.notifications.splice(payload, 1)
  },

  DELETE_ALL_NOTIFICATION(state) {
    state.notifications = []
  },
}
