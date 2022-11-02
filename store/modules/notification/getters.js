export default {
  hasNotification(state) {
    return state.notifications.length > 0;
  },
  notifications(state) {
    return state.notifications.sort((a, b) => {
      let dateA = Date.parse(a.startAt.replace(/(\/)/gi, '-')
        .replace(/(\w+)-(\w+)-(\w+)/gi, '$3-$2-$1'))

      let dateB = Date.parse(b.startAt.replace(/(\/)/gi, '-')
        .replace(/(\w+)-(\w+)-(\w+)/gi, '$3-$2-$1'))
      return dateA < dateB ? 1 : -1;
    })
  },
  notificationsNumber(state) {
    return state.notifications ? state.notifications.filter(notification => !notification.isRead).length : 0
  }
};
