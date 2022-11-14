import studizAPI from './AxiosConfig'

const baseURL = process.env.baseURL

export default {
  signInGetProfile(accessToken) {
    return studizAPI(baseURL).post('/user/signIn', void 0, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  },
  signUpStudentWithEmail(dataToken) {
    return studizAPI(baseURL).post('/student/signup/withEmail', void 0, {
      headers: {
        token: dataToken,
      },
    })
  },
  signUpStudentWithGoogle(dataToken) {
    return studizAPI(baseURL).post('/student/signup/withGoogle', void 0, {
      headers: {
        token: dataToken,
      },
    })
  },
  signUpTeacherWithEmail(dataToken) {
    return studizAPI(baseURL).post('/teacher/signup/withEmail', void 0, {
      headers: {
        token: dataToken,
      },
    })
  },
  signUpTeacherWithGoogle(dataToken) {
    return studizAPI(baseURL).post('/teacher/signup/withGoogle', void 0, {
      headers: {
        token: dataToken,
      },
    })
  },
  checkDuplicateEmail(email) {
    return studizAPI(baseURL).post('/user/checkDuplicateEmail', {
      email,
    })
  },

  getNotificationByUID(uid) {
    return studizAPI(baseURL).get(`/get/notification/uid/${uid}`, {
      headers: {
        token: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
  },

  readNotification(id) {
    return studizAPI(baseURL).put(`/read/notification/${id}`, void 0, {
      headers: {
        token: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
  },

  deleteNotification(id) {
    return studizAPI(baseURL).delete(`/delete/notification/${id}`, {
      headers: {
        token: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
  },

  deleteAllNotification(uid) {
    return studizAPI(baseURL).delete(`/delete/notification/uid/${uid}`, {
      headers: {
        token: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
  },
}
