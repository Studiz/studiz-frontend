export default {
  setPinCode(state, pinCode) {
    state.pinCode = pinCode
  },

  setQuizData(state, quizData) {
    state.quizData = quizData
  },

  setClassRoomId(state, classRoomId) {
    state.quizData.classRoomId = classRoomId
  },

  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage
  }

};
