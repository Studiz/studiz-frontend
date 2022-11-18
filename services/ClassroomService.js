import studizAPI from './AxiosConfig'

const baseURL = process.env.baseURL

export default {
  getClassroom(classId) {
    return studizAPI(baseURL).get(`/getClassroom/byClassroomId/${classId}`, {
      headers: {
        token: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
  },
}
