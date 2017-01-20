<template>
	<div class="head z-clearfix">
		<!-- <img src="../../../asset/img/logo.png"> -->
		<h1>陆通联合律师事务所后台管理系统</h1>
		<span class="logout" v-show="isLogin" @click="logout()">登出</span>
		<span class="changePwd" v-show="isLogin" @click="openPopPwd()">修改密码</span>
		<span class="username" v-show="isLogin">{{username}}</span>
		<div class="z-pop pop-pwd" v-show="showPopPwd">
			<div class="pop-blank">
				<input type="password" placeholder="请输入旧密码" v-model="oldPwd">
			</div>
			<div class="pop-blank">
				<input type="password" placeholder="请输入新密码" v-model="newPwd">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="changePwd()">确定</button>
				<button class="z-pop-cancel" @click="closePopPwd()">取消</button>
			</div>
		</div>
		<div class="z-cover" v-show="showCover"></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				oldPwd: "",
				newPwd: "",
				showPopPwd: false,
				showCover: false,
			}
		},
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
			},
			openPopPwd: function() {
				this.oldPwd = ""
				this.newPwd = ""
				this.showCover = true
				this.showPopPwd = true
			},
			changePwd: function() {
				const _self = this
				const options = {
					token: this.$store.getters.token,
					old_password: this.oldPwd,
					new_password: this.newPwd
				}
				this.$http({
                		url: '/admin/index.php?c=user&m=update_password',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.closePopPwd()
    					_self.$router.push('/login')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopPwd: function() {
				this.showPopPwd = false
				this.showCover = false
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

		.logout, .changePwd {
			cursor: pointer;
		}

		.username {
			color: rgba(255, 255, 255, 0.6);
		}

		.pop-pwd {
			margin-top: -110px;
			margin-left: -210px;
		}
	}
</style>