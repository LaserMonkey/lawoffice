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
import Banner from 'tpl/banner.vue'
import ArticleList from './tpl/articlelist.vue'

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
		default: ArticleList,
		head: Head,
		banner: Banner,
		foot: Foot
	}
}, {
	path: '/practice',
    components: {
		// default: Practice,
		head: Head,
		banner: Banner,
		foot: Foot
	}
}, {
	path: '/lawyer',
    components: {
		// default: Lawyer,
		head: Head,
		banner: Banner,
		foot: Foot
	}
}, {
	path: '/article',
    components: {
		default: ArticleList,
		head: Head,
		banner: Banner,
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
