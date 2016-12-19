import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from 'store/home.js'
require('basecss')

Vue.use(VueRouter)
Vue.use(VueResource)

import Home from './tpl/home.vue'
import Foot from 'tpl/home/foot.vue'
import Head from 'tpl/home/head.vue'
import Banner from 'tpl/home/banner.vue'
import About from './tpl/about.vue'
import News from './tpl/news.vue'
import Article from './tpl/article.vue'

const routes = [{
	path: '/',
	name: 'home',
    components: {
		default: Home,
		head: Head,
		foot: Foot
	}
}, {
	path: '/about',
	name: 'about',
    components: {
		default: About,
		head: Head,
		banner: Banner,
		foot: Foot
	}
}, {
	path: '/practice',
	name: 'practice',
    components: {
		// default: Practice,
		head: Head,
		banner: Banner,
		foot: Foot
	}
}, {
	path: '/lawyer',
	name: 'lawyer',
    components: {
		// default: Lawyer,
		head: Head,
		banner: Banner,
		foot: Foot
	}
}, {
	path: '/news',
	name: 'news',
    components: {
		default: News,
		head: Head,
		banner: Banner,
		foot: Foot
	}
}, {
	path: '/article/:columnID',
	name: 'article',
    components: {
		default: Article,
		head: Head,
		banner: Banner,
		foot: Foot
	}
}]

const router = new VueRouter({
	routes
})

const home = new Vue({
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
