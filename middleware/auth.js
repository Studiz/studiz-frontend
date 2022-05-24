import userService from '../services/UserService'

export default function ({
  store,
  redirect
}) {
  if (localStorage.getItem('accessToken') && !store.state.user) {
    userService.signInGetProfile(localStorage.getItem('accessToken')).then(res => {
      store.commit('SET_USER', res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
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
