import Vue from 'vue'
import VueRouter from 'vue-router'
require('basecss')

Vue.use(VueRouter)

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
	path: '/bar',
    components: {
		default: Home,
		head: Head,
		foot: Foot
	}
}]

const router = new VueRouter({
	routes
})

const app = new Vue({
	router
}).$mount('#home')
