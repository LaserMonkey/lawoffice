import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	columnID: 1,
	lang: 1
}

const getters = {
	columnID: state => state.columnID,
	lang: state => state.lang
}

const mutations = {}

export default new Vuex.Store({
	state,
	getters,
	mutations
})