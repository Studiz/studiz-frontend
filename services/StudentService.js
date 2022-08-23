import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
  joinClassroom(pinCode, studentId) {
    return studizAPI(baseURL).put(`/join/classroom/${pinCode}/${studentId}`);
  },

  leaveClassroom(classroomId, studentId) {
    return studizAPI(baseURL).delete(`/leftClassroom/${classroomId}/${studentId}`);
  },

  generatePinCode(classId) {
    return studizAPI(baseURL).get(`/getPinCode/${classId}`);
  },
  
  updateProfile(studentId, student) {
    return studizAPI(baseURL).put(`/update/student/${studentId}`, student);
  }
}
