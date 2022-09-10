import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
  createClassroom(data) {
    return studizAPI(baseURL).post('/create/classroom', data);
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
  }
}
