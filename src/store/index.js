import Vue from "vue";
import Vuex from "vuex";
import getters from '../store/getters';
import mutations from '../store/mutations';
import actions from '../store/actions';
Vue.use(Vuex);



export default new Vuex.Store({

	state: {
		isLogin: "",
		user: {
			userName:'',
			userId:'',
		},
    registerUser: {
      userEmail: "",
      userPassword: "",

      userName: "",
      userSex: "",
      userShow: "",
    }
	},
	getters,
	mutations,
	actions
});
