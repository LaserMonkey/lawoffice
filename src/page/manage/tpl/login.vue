<template>
	<div class="login">
		<div class="login-area">
			<div class="login-input">
				<label>用户名：</label><input placeholder="用户名" v-model="username">
			</div>
			<div class="login-input">
				<label>密码：</label><input type="password" placeholder="密码" v-model="password" @keyup.enter="login()">
				<span class="z-error" v-show="loginErr">{{loginErrMsg}}</span>
			</div>
			<button @click="login()">登录</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				loginErr: false,
				loginErrMsg: "用户名或密码错误",
				username: "",
				password: ""
			}
		},
		beforeCreate: function () {
			this.$nextTick(function () {
				this.$store.commit('isLogin', false)
				localStorage.setItem("isLogin", false)
			})
		},
		methods: {
			login: function() {
				this.loginErr = false
				const _self = this
				const options = {
					username: this.username,
					password: this.password
				}
				this.$http({
                		url: '/admin/index.php?c=user&m=user_login',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
					const data = response.data
					const status = data.status
    				if(status === -1) {
    					_self.loginErrMsg = "请输入用户名和密码"
    					_self.loginErr = true
    				} else if(status === 0) {
    					_self.loginErrMsg = "请联系开发人员"
    					_self.loginErr = true
    				} else if(status === -2) {
    					_self.loginErrMsg = "用户不存在"
    					_self.loginErr = true
    				} else if(status === -3) {
    					_self.loginErrMsg = "密码错误"
    					_self.loginErr = true
    				} else if(status === 1) {
    					this.$store.commit('token', data.token)
    					localStorage.setItem("token", data.token)
    					this.$store.commit('uid', data.uid)
    					localStorage.setItem("uid", data.uid)
    					this.$store.commit('username', _self.username)
    					localStorage.setItem("username", _self.username)
    					this.$store.commit('isLogin', true)
    					localStorage.setItem("isLogin", true)
    					this.$router.push('/')
    				} else {
    					_self.loginErrMsg = "网络错误"
    					_self.loginErr = true
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			}
		}
	}
</script>

<style lang="sass">
	.login {
		min-height: 400px;
		padding-top: 100px;
		background-color: #fafafa;

		.login-area {
			width: 380px;
			margin: 0 auto;

			.login-input {
				margin-bottom: 10px;

				label {
					display: inline-block;
					width: 60px;
					margin-right: 20px;
					font-size: 1.4rem;
				}

				input {
					margin-bottom: 10px;
				}

				span {
					width: 380px;
					padding-left: 80px;
				}
			}

			button {
				margin-left: 80px;
			}
		}
	}
</style>