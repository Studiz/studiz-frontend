export default {
  watch: {
    notifications() {
      this.notificationNumber()
    },
  },
  methods: {
    notificationNumber() {
      let notiNumber
      notiNumber = this.$store.getters.notifications ?
        this.$store.getters.notificationsNumber :
        ''

      let listNoti = document.getElementById('list-Notification')
      listNoti.innerHTML = notiNumber
      let bottonNoti = document.getElementById('bottom-nav-Notification')
      bottonNoti.innerHTML = notiNumber

      if (this.$store.getters.notificationsNumber > 0) {
        listNoti.classList.add('Notification')
        bottonNoti.classList.add('Notification')
      } else {
        listNoti.classList.remove('Notification')
        bottonNoti.classList.remove('Notification')
        bottonNoti.classList.add('hidden')
        listNoti.classList.add('hidden')
      }
    },
  },
  computed: {
    notifications() {
      return this.$store.getters.notifications
    },
  },
  mounted() {
    setTimeout(() => {
      this.notificationNumber()
    }, 500)
  },
}
