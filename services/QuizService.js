import studizAPI from './AxiosConfig'

const baseURL = process.env.baseURL

export default {
  getQuizHistoryByQuizId(quizId) {
    return studizAPI(baseURL).get(`/get/quizHistory/quizId/${quizId}`)
  },

  getAllTag() {
    return studizAPI(baseURL).get(`/getAlltag`)
  },
}
