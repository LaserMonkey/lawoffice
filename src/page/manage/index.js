import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from 'store/manage.js'
require('basecss')

Vue.use(VueRouter)
Vue.use(VueResource)

import Head from 'tpl/manage/head.vue'
import Menu from './tpl/menu.vue'
import Login from './tpl/login.vue'
import Index from './tpl/index.vue'

const routes = [{
	path: '/login',
	name: 'login',
    components: {
		default: Login,
		head: Head,
		menu: Menu
	}
}, {
	path: '/',
	name: 'index',
    components: {
		default: Index,
		head: Head,
		menu: Menu
	}
}]

const router = new VueRouter({
	routes
})

const manage = new Vue({
	router,
	store
}).$mount('#manage')
