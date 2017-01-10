import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from 'store/manage.js'
require('basecss')
require('jquery')

Vue.use(VueRouter)
Vue.use(VueResource)

import Head from 'tpl/manage/head.vue'
import Menu from 'tpl/manage/menu.vue'
import Login from './tpl/login.vue'
import Slider from './tpl/slider.vue'
import Hot from './tpl/hot.vue'
import ArticleList from './tpl/articlelist.vue'
import Article from './tpl/article.vue'
import Column from './tpl/column.vue'
import LawyerList from './tpl/lawyerlist.vue'
import Lawyer from './tpl/lawyer.vue'
import PracticeList from './tpl/practicelist.vue'
import Practice from './tpl/practice.vue'
import PracticeType from './tpl/practicetype.vue'
import AboutList from './tpl/aboutlist.vue'
import About from './tpl/about.vue'
import ArticleType from './tpl/articletype.vue'

const routes = [{
	path: '/',
	name: 'slider',
    components: {
		default: Slider,
		head: Head,
		menu: Menu
	}
}, {
	path: '/hot',
	name: 'hot',
    components: {
		default: Hot,
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
	path: '/articlelist',
	name: 'articlelist',
    components: {
		default: ArticleList,
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
}, {
	path: '/articletype',
	name: 'articletype',
    components: {
		default: ArticleType,
		head: Head,
		menu: Menu
	}
}, {
	path: '/column',
	name: 'column',
    components: {
		default: Column,
		head: Head,
		menu: Menu
	}
}, {
	path: '/lawyerlist',
	name: 'lawyerlist',
    components: {
		default: LawyerList,
		head: Head,
		menu: Menu
	}
}, {
	path: '/lawyer',
	name: 'lawyer',
    components: {
		default: Lawyer,
		head: Head,
		menu: Menu
	}
}, {
	path: '/practicelist',
	name: 'practicelist',
    components: {
		default: PracticeList,
		head: Head,
		menu: Menu
	}
}, {
	path: '/practice',
	name: 'practice',
    components: {
		default: Practice,
		head: Head,
		menu: Menu
	}
}, {
	path: '/practicetype',
	name: 'practicetype',
    components: {
		default: PracticeType,
		head: Head,
		menu: Menu
	}
}, {
	path: '/aboutlist',
	name: 'aboutlist',
    components: {
		default: AboutList,
		head: Head,
		menu: Menu
	}
}, {
	path: '/about',
	name: 'about',
    components: {
		default: About,
		head: Head,
		menu: Menu
	}
}]

const router = new VueRouter({
	routes,
	// beforeEach ((to, from, next) => {
	// 	if (to.matched.some(record => record.meta.requiresAuth)) {
	// 		// this route requires auth, check if logged in
	// 		// if not, redirect to login page.
	// 		if (!auth.loggedIn()) {
	// 			next({
	// 				path: '/login',
	// 				query: { redirect: to.fullPath }
	// 			})
	// 		} else {
	// 			next()
	// 		}
	// 	} else {
	// 		next() // 确保一定要调用 next()
	// 	}
	// })
	// beforeEach((transition) => {
	// 	if (transition.to.auth) {
	// 		//判断是否登录，（可以通过接口，Vuex状态 token）
	// 		//没有登录走下面逻辑
	// 		let redirect = encodeURIComponent(transition.to.path);
	// 		transition.redirect('/logon?redirect=' + redirect);
	// 		//redirect 作为参数，登录之后跳转回来
	// 	} else {
	// 		transition.next();
	// 	}
	// })
})

router.beforeEach ((to, from, next) => {
	// console.log(to)
	// console.log(from)
	// console.log(next)
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!auth.loggedIn()) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next() // 确保一定要调用 next()
	}
})

// router.beforeEach((transition) => {
// 	console.log(transition)
//     if (transition.to.auth) {
//          //判断是否登录，（可以通过接口，Vuex状态 token）
//          //没有登录走下面逻辑
//          let redirect = encodeURIComponent(transition.to.path);
//          transition.redirect('/logon?redirect=' + redirect);
//          //redirect 作为参数，登录之后跳转回来
//     } else {
//         transition.next();
//     }
// })

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
