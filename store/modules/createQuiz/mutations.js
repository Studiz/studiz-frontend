export default {
  setQuizTemplate(state, quizTemplate) {
    state.quizTemplate = quizTemplate
  },

  setTeacherId(state, teacherId) {
    state.quizTemplate.teacherId = teacherId
  },


  setQuizTitle(state, quizTitle) {
    state.quizTemplate.title = quizTitle
  },

  setQuizDescription(state, quizDescription) {
    state.quizTemplate.description = quizDescription
  },

  setQuizTags(state, quizTags) {
    state.quizTemplate.tags = quizTags
  },

  setQuizImage(state, quizImage) {
    state.quizTemplate.image = quizImage
  },

  setQuizQuestions(state, quizQuestions) {
    state.quizTemplate.questions = quizQuestions
  },

  setLastUpdated(state, date) {
    state.quizTemplate.lastUpdated = date
  },

  addQuizQuestion(state, question) {
    state.quizTemplate.questions.push(question)
  },

  setImageQuizFile(state, imageQuizFile) {
    state.imageQuizFile = imageQuizFile
  },

  setImageQuestionFiles(state, imageQuestionFiles) {
    state.imageQuestionFiles = imageQuestionFiles
  },

  createImageFileList(state) {
    state.imageQuestionFiles = state.quizTemplate.questions.map(question => {
      return question.fileImage
    })
  },

  setIsEditMode(state, isEditMode) {
    state.isEditMode = isEditMode
  },

};
