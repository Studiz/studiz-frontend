import studizAPI from "./AxiosConfig";

const baseURL = process.env.baseURL;

export default {
  signUpStudentWithEmail(dataToken) {
    return studizAPI(baseURL).post('/student/signup/withEmail', void 0, {
      headers: {
        'token': dataToken
      }
    });
  },
  signUpStudentWithGoogle(dataToken) {
    return studizAPI(baseURL).post('/student/signup/withGoogle', void 0, {
      headers: {
        'token': dataToken
      }
    });
  },
  checkDuplicateEmail(email) {
    return studizAPI(baseURL).post('/user/checkDuplicateEmail', {
      email
    })
  }
}
