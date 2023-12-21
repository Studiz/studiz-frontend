import userService from '../services/UserService'
import socket from '~/plugins/socket.io'
export default function ({
  store,
  redirect
}) {
  if (localStorage.getItem('accessToken') && !store.state.user) {
    userService.signInGetProfile(localStorage.getItem('accessToken')).then(async res => {
      store.commit('setUser', res.data)
      socket.emit(
        'join-classrooms',
        store.getters.classRooms.map((classRoom) => classRoom.id)
      )
      // localStorage.setItem('user', JSON.stringify(res.data))
    }).catch(err => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userId')
     // redirect('/login')
    })
  }
  // if (!localStorage.getItem('accessToken') && !store.state.user) {
  //   console.log("in middleware");
  //   redirect("/join");
  //   console.log("routed");
  // }

  // if (route.path !== '/login') {
  //   //we are on a protected route
  //   if(!app.$fire.auth.currentUser) {
  //     //take them to sign in page
  //     return redirect('/login')
  //   }
  // } else if (route.path === '/login') {
  //   if(!app.$fire.auth.currentUser) {
  //     //leave them on the sign in page
  //   } else {
  //     return redirect('/')
  //   }
  // }

}
