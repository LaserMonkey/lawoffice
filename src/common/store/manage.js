import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	token: '',
	login: 0,
	uid: -1,
}

const getters = {
	getToken: state => state.token,
	getLogin: state => state.login,
	getUid: state => state.uid
}

const mutations = {
	setToken(state, token) {
		state.token = token
	},
	setLogin(state, login) {
		state.login = login
	},
	setUid(state, uid) {
		state.uid = uid
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations
})