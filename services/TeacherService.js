import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
  updateProfile(teacherId, teacher) {
    return studizAPI(baseURL).put(`/update/teacher/${teacherId}`, teacher);
  },

  updateImageProfile(teacherId, image) {
    return studizAPI(baseURL).post(`/upload/teacher/image/${teacherId}`, image);
  },

  createClassroom(data) {
    return studizAPI(baseURL).post('/create/classroom', data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  generatePinCode(classId) {
    return studizAPI(baseURL).get(`/getPinCode/${classId}`);
  },

  createQuizTemplate(data) {
    return studizAPI(baseURL).post('/create/quizTemplate', data);
  },

  getQuizTemplate(teacherId) {
    return studizAPI(baseURL).get(`/get/quizTemplate/teacherId/${teacherId}`);
  },

  uploadImage(image) {
    let data = new FormData()
    data.append('studizImg', image)
    return studizAPI(baseURL).post('/upload/image', data);
  },

  updateImageQuestion(quizId, index, image) {
    let data = new FormData()
    data.append('studizImg', image)
    return studizAPI(baseURL).put(`/update/quizTemplate/image/${quizId}/${index}`, data);
  },

  deleteQuizTemplate(quizId) {
    return studizAPI(baseURL).delete(`/delete/quizTemplate/${quizId}`);
  },

  getQuizTemplateById(quizId) {
    return studizAPI(baseURL).get(`/get/quizTemplate/${quizId}`);
  },

  updateQuizTemplate(quizId, data) {
    return studizAPI(baseURL).put(`/update/quizTemplate/${quizId}`, data);
  },

  createQuiz(data) {
    return studizAPI(baseURL).post('/create/quiz', data);
  },

  getQuizById(quizId) {
    return studizAPI(baseURL).get(`/get/quiz/${quizId}`);
  }

}
