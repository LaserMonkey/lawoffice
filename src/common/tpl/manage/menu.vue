<template>
	<div class="menu">
		<ul v-show="isLogin">
			<li><router-link to="/">首页轮播</router-link></li>
			<li><router-link to="/hot">首页热点</router-link></li>
			<li><router-link to="/column">栏目管理</router-link></li>
			<li><router-link to="/articlelist">文章列表</router-link></li>
			<li><router-link to="/articletype">文章类型</router-link></li>
			<li><router-link to="/lawyerlist">律师列表</router-link></li>
			<li><router-link to="/practicelist">业务列表</router-link></li>
			<li><router-link to="/practicetype">业务类型</router-link></li>
			<li><router-link to="/aboutlist">关于我们</router-link></li>
			<li><router-link to="/account">账号管理</router-link></li>
		</ul>
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
			}
		}
	}
</script>

<style lang="sass">
	.menu {
		position: relative;
		float: left;
		width: 200px;
		min-height: 400px;
		padding-top: 40px;
		padding-left: 60px;
		font-size: 1.6rem;
		box-shadow: 3px -2px 5px rgba(0, 0, 0, 0.1);
		z-index: 1;

		li {
			margin-bottom: 40px;

			a {
				color: #333333;
			}
		}
	}
</style>