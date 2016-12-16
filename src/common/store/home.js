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

const mutations = {
	changeLang(state, langType) {
		state.lang = langType
	},
	changeColumnID(state, columnID) {
		state.columnID = columnID
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations
})