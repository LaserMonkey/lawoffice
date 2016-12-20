import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	token: localStorage.getItem("token"),
	isLogin: localStorage.getItem("isLogin"),
	uid: localStorage.getItem("uid"),
	username: localStorage.getItem("username")
}

const getters = {
	token: state => state.token,
	isLogin: state => state.isLogin,
	uid: state => state.uid,
	username: state => state.username
}

const mutations = {
	token(state, token) {
		state.token = token
	},
	isLogin(state, isLogin) {
		state.isLogin = isLogin
	},
	uid(state, uid) {
		state.uid = uid
	},
	username(state, username) {
		state.username = username
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations
})