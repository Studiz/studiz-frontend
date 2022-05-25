import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
  createClassroom(data) {
    return studizAPI(baseURL).post('/create/classroom', data);
  },

  generatePinCode(classId) {
    return studizAPI(baseURL).get(`/getPinCode/${classId}`);
  }
}
