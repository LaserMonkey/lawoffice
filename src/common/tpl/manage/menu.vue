<template>
	<div class="menu">
		<ul v-show="isLogin">
			<li><router-link to="/">口口口口</router-link></li>
			<li><router-link to="/article">口口口口</router-link></li>
			<li><router-link to="/articletype">口口口口</router-link></li>
			<li><router-link to="/practice">口口口口</router-link></li>
			<li><router-link to="/lawyer">口口口口</router-link></li>
			<li><router-link to="/about">口口口口</router-link></li>
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
		float: left;
		width: 200px;
		min-height: 400px;
		padding-top: 40px;
		padding-left: 60px;
		font-size: 1.6rem;
		box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.1);

		li {
			margin-bottom: 40px;

			a {
				color: #333333;
			}
		}
	}
</style>