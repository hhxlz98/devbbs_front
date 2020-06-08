
export default {
  registerUserName(context, value) {
    context.commit("setRegisterUserName", value)
  },
  registerUserEmail(context, value) {
    context.commit("setRegisterUserEmail", value)
  },
  registerUserSex(context, value) {
    context.commit("setRegisterUserSex", value)
  },
  registerUserPassword(context, value) {
    context.commit("setRegisterUserPassword", value)
  },
  registerUserShow(context, value) {
    context.commit("setRegisterUserShow", value)
  },

  loginUserName(context, value) {
    context.commit("setLoginUserName", value)
  },
  loginUserId(context, value) {
    context.commit("setLoginUserId", value)
  },
  loginUserEmail(context, value) {
    context.commit("setLoginUserEmail", value)
  },
  loginUserImgUrl(context, value) {
    context.commit("setLoginUserImgUrl", value)
  },
  loginUserToken(context, value) {
    context.commit("setLoginUserToken", value)
  },
  longinUser(context, value) {
    context.commit("setLoginUser", value)
  },
  logoutUser(context) {
    context.commit("clearLoginUser")
  },


 }
