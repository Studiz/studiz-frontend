import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
  joinClassroom(pinCode, studentId) {
    return studizAPI(baseURL).put(`/join/classroom/${pinCode}/${studentId}`, void 0, {
      headers: {
        'token': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  },

  leaveClassroom(classroomId, studentId) {
    return studizAPI(baseURL).delete(`/leftClassroom/${classroomId}/${studentId}`);
  },

  updateProfile(studentId, student) {
    return studizAPI(baseURL).put(`/update/student/${studentId}`, student);
  },

  updateImageProfile(studentId, image) {
    return studizAPI(baseURL).post(`/upload/student/image/${studentId}`, image);
  },

  joinQuiz(pinCode, studentId) {
    // return studizAPI(baseURL).patch(`/joinQuiz/${pinCode}`, studentId);
    return studizAPI(baseURL).post(`/joinQuiz/${pinCode}`);
  },

  getQuizById(quizId) {
    return studizAPI(baseURL).get(`/get/quizForStudent/${quizId}`);
  }

}
