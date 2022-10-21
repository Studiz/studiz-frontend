import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
  updateProfile(teacherId, teacher) {
    return studizAPI(baseURL).put(`/update/teacher/${teacherId}`, teacher, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  updateImageProfile(teacherId, image) {
    return studizAPI(baseURL).post(`/upload/teacher/image/${teacherId}`, image, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  createClassroom(data) {
    return studizAPI(baseURL).post('/create/classroom', data, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  generatePinCode(classId) {
    return studizAPI(baseURL).get(`/getPinCode/${classId}`, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  createQuizTemplate(data) {
    return studizAPI(baseURL).post('/create/quizTemplate', data, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  getQuizTemplate(teacherId) {
    return studizAPI(baseURL).get(`/get/quizTemplate/teacherId/${teacherId}`, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  uploadImage(image) {
    let data = new FormData()
    data.append('studizImg', image)
    return studizAPI(baseURL).post('/upload/image', data, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  updateImageQuestion(quizId, index, image) {
    let data = new FormData()
    data.append('studizImg', image)
    return studizAPI(baseURL).put(`/update/quizTemplate/image/${quizId}/${index}`, data, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  deleteQuizTemplate(quizId) {
    return studizAPI(baseURL).delete(`/delete/quizTemplate/${quizId}`, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  getQuizTemplateById(quizId) {
    return studizAPI(baseURL).get(`/get/quizTemplate/${quizId}`, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  updateQuizTemplate(quizId, data) {
    return studizAPI(baseURL).put(`/update/quizTemplate/${quizId}`, data, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  createQuiz(data) {
    return studizAPI(baseURL).post('/create/quiz', data, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  getQuizById(quizId) {
    return studizAPI(baseURL).get(`/get/quiz/${quizId}`);
  }

}
