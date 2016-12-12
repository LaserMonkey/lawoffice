import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Bar = { template: '<div>bar</div>' }
import Home from './tpl/Home.vue'

const routes = [{
	path: '/',
    component: Home
}, {
	path: '/bar',
	component: Bar
}]

const router = new VueRouter({
	routes
})

const app = new Vue({
	router
}).$mount('#home')
