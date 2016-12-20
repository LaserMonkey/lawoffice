<template>
	<div class="head z-clearfix">
		<img src="">
		<h1>口口口口</h1>
		<span class="logout" v-show="isLogin" @click="logout()">口口</span>
		<span class="username" v-show="isLogin">{{username}}</span>
	</div>
</template>

<script type="text/javascript">
	export default {
		computed: {
			isLogin() {
				if(this.$store.getters.isLogin == null) {
					return false
				}
	    		return this.$store.getters.isLogin
			},
			username() {
				return this.$store.getters.username
			}
		},
		methods: {
			logout: function() {
				const _seft = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=user&m=logout&token=' + _seft.$store.getters.token,
				).then((response) => {
					const status = response.data.status
    				if(status === 1) {
    					this.$store.commit('isLogin', false)
    					localStorage.setItem("isLogin", false)
    					this.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			}
		}
	}
</script>

<style lang="sass">
	.head {
		width: 100%;
		padding: 20px 40px 20px 25px;
		color: white;
		background-color: #df001f;

		img {
			display: block;
			float: left;
			height: 40px;
			margin-right: 35px;
		}

		h1 {
			float: left;
			margin-top: 10px;
			font-size: 1.6rem;
			font-weight: normal;
		}

		span {
			display: block;
			float: right;
			margin-left: 20px;
			margin-top: 13px;
		}

		.logout {
			cursor: pointer;
		}

		.username {
			color: rgba(255, 255, 255, 0.6);
		}
	}
</style>