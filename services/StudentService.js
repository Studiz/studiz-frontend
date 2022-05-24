import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
  joinClassroom(pinCode, studentId) {
    return studizAPI(baseURL).put(`/join/classroom/${pinCode}/${studentId}`);
  },

  generatePinCode(classId) {
    return studizAPI(baseURL).get(`/getPinCode/${classId}`);
  }
}
