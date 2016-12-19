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

const routes = [{
	path: '/',
	name: 'index',
    components: {
		default: Login,
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
