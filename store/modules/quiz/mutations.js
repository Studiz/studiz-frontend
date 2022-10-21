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

  setStartAt(state, startAt) {
    state.quizData.startAt = startAt
  },

  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage
  }

};
