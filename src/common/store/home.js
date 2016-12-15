import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	columnID: 1
}

const getters = {
	getColumnID: state => state.columnID
}

const mutations = {}

export default new Vuex.Store({
	state,
	getters,
	mutations
})