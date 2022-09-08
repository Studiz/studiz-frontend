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

  uploadImage(image) {
    let data = new FormData()
    data.append('studizImg', image)
    return studizAPI(baseURL).post('/upload/image', data);
  }
}
