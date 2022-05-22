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
  checkDuplicateEmail(email) {
    return studizAPI(baseURL).post('/user/checkDuplicateEmail', {
      email
    }).then(res => {
      if (res.status === 200) {
        return true
      }
    }).catch(err => {
      alert(err.response.data);
    })
  }
}
