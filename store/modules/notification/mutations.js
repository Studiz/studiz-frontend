export default {
  pushNotification(state, notification) {
    state.notifications.push(notification)
  },

  CLICKED_NOTIFICATION(state, payload) {
    state.notifications[payload].clicked = true
  },

  CLOSE_NOTIFICATION(state, payload) {
    state.notifications.splice(payload, 1)
  },
}
