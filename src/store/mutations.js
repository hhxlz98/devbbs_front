export default {
  setRegisterUserName(state, value) {
    state.registerUser.userName = value;
  },
  setRegisterUserEmail(state, value) {
    state.registerUser.userEmail = value;
  },
  setRegisterUserPassword(state, value) {
    state.registerUser.userPassword = value;
  },
  setRegisterUserShow(state, value) {
    state.registerUser.userShow = value;
  },
  setRegisterUserSex(state, value) {
    state.registerUser.userSex = value;
  },

  setLoginUserName(state, value) {
    state.user.userName = value;
  },
  setLoginUserId(state, value) {
    state.user.userId = value;
  },
  setLoginUserEmail(state, value) {
    state.user.userEmail = value;
  },
  loginUserImgUrl(state, value) {
    state.user.imgUrl = value;
  },
  setLoginUserToken(state, value) {
    state.user.token = value;
  },
  setLoginUser(state, value) {
    state.user = value;
    state.isLogin = true;
    window.localStorage.setItem('user', JSON.stringify(value));
  },
  clearLoginUser(state) {
    state.user.userId = 0;
    state.user.token = null;
    state.isLogin = false;
    window.localStorage.removeItem('user');
  }
}
