<template>
	<div class="login">
		<div class="login-area">
			<div class="login-input">
				<label>用户名：</label><input placeholder="用户名" v-model="username">
			</div>
			<div class="login-input">
				<label>密码：</label><input type="password" placeholder="密码" v-model="password">
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
		methods: {
			login: function() {
				this.loginErr = false
				const _seft = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=user&m=user_login&username=' + _seft.username + '&password=' + _seft.password,
					// TODO	上线修改
					// {
					// 	c: 'user',
					// 	m: 'user_login',
					// 	username: _seft.username,
					// 	password: _seft.password
					// }
				).then((response) => {
					const data = response.data
					const status = data.status
    				if(status === -1) {
    					_seft.loginErrMsg = "请输入用户名和密码"
    					_seft.loginErr = true
    				} else if(status === 0) {
    					_seft.loginErrMsg = "请联系开发人员"
    					_seft.loginErr = true
    				} else if(status === -2) {
    					_seft.loginErrMsg = "用户不存在"
    					_seft.loginErr = true
    				} else if(status === -3) {
    					_seft.loginErrMsg = "密码错误"
    					_seft.loginErr = true
    				} else if(status === 1) {
    					this.$store.commit('setToken', data.token)
    					this.$store.commit('setUid', data.uid)
    					localStorage.setItem("token", data.token)
    					localStorage.setItem("uid", data.uid)
    					this.$router.push('/')
    				} else {
    					_seft.loginErrMsg = "网络错误"
    					_seft.loginErr = true
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
		margin-left: 200px;
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