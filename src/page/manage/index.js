import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from 'store/manage.js'
require('basecss')

Vue.use(VueRouter)
Vue.use(VueResource)

import Head from 'tpl/manage/head.vue'
import Menu from 'tpl/manage/menu.vue'
import Login from './tpl/login.vue'
import Index from './tpl/index.vue'
import Article from './tpl/article.vue'

const routes = [{
	path: '/',
	name: 'index',
    components: {
		default: Index,
		head: Head,
		menu: Menu
	}
}, {
	path: '/login',
	name: 'login',
    components: {
		default: Login,
		head: Head,
		menu: Menu
	}
}, {
	path: '/article',
	name: 'article',
    components: {
		default: Article,
		head: Head,
		menu: Menu
	}
}]

const router = new VueRouter({
	routes
})

const manage = new Vue({
	router,
	store,
	// beforeCreate: function () {
	// 	this.$nextTick(function () {
	// 		// console.log(store)
	// 		// if(!store.getters.isLogin == false) {
	// 		// 	console.log(store.getters.isLogin)
	// 		// 	router.push('/login')
	// 		// }
	// 	})
	// }
}).$mount('#manage')
