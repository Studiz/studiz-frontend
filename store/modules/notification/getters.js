export default {
  hasNotification(state) {
    return state.notifications.length > 0;
  },
  notifications(state) {
    return state.notifications
  },
};
