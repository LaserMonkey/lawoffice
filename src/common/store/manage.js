import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	token: '',
	login: 0
}

const getters = {
	getToken: state => state.token,
	getLogin: state => state.login
}

const mutations = {
	setToken(state, token) {
		state.token = token
	},
	setLogin(state, login) {
		state.login = login
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations
})