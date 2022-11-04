export default {
  setPinCode(state, pinCode) {
    state.pinCode = pinCode
  },

  setQuizData(state, quizData) {
    state.quizData = quizData
  },

  setClassroomId(state, classroomId) {
    state.quizData.classroomId = classroomId
  },

  setStartAt(state, startAt) {
    state.quizData.startAt = startAt
  },

  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage
  },

  setPickedItemList(state, payload) {
    state.pickedItemList.push(payload)
  },
}
