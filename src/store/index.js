import Vue from "vue";
import Vuex from "vuex";
import getters from '../store/getters';
import mutations from '../store/mutations';
import actions from '../store/actions';
Vue.use(Vuex);



export default new Vuex.Store({

	state: {
		isLogin: JSON.parse(localStorage.getItem('user')) == null ? false : true,
    isRemembered: JSON.parse(localStorage.getItem('isRemenbered')) || false,
		user: {
			userName:window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userName,
			userId:window.localStorage.getItem('user' || '[]') == null ? 0 : JSON.parse(window.localStorage.getItem('user' || '[]')).userId,
      imgUrl:window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).imgUrl,
      userEmail: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userEmail,
      token: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).token,
		},
    manageUser: {
      userName: '喵喵喵',
      imgUrl:'/userImg/1586003018447.jpeg',
    },
    registerUser: {
      userEmail: '',
      userPassword: '',

      userName: '',
      userSex: '',
      userShow: '',
    },
	},

	getters,
	mutations,
	actions
});
