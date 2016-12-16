import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from 'store/home.js'
require('basecss')

Vue.use(VueRouter)
Vue.use(VueResource)

import Home from './tpl/home.vue'
import Foot from 'tpl/foot.vue'
import Head from 'tpl/head.vue'

const routes = [{
	path: '/',
    components: {
		default: Home,
		head: Head,
		foot: Foot
	}
}, {
	path: '/about',
    components: {
		// default: About,
		head: Head,
		foot: Foot
	}
}, {
	path: '/practice',
    components: {
		// default: Practice,
		head: Head,
		foot: Foot
	}
}, {
	path: '/lawyer',
    components: {
		// default: Lawyer,
		head: Head,
		foot: Foot
	}
}, {
	path: '/article',
    components: {
		// default: Article,
		head: Head,
		foot: Foot
	}
}]

const router = new VueRouter({
	routes
})

const app = new Vue({
	router,
	store,
	beforeCreate: function () {
		this.$nextTick(function () {
			if(localStorage.getItem("lang") === null & navigator.language === 'zh-CN') {
				localStorage.setItem("lang", 1)
			} else if(localStorage.getItem("lang") === null & navigator.language === 'zh-TW') {
				localStorage.setItem("lang", 2)
			} else if(localStorage.getItem("lang") === null) {
				localStorage.setItem("lang", 3)
			}
			store.commit('changeLang', localStorage.getItem("lang"))
		})
	}
}).$mount('#home')
