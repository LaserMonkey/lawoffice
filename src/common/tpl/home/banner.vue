<template>
	<div class="banner" v-if="columnID == 2" style="background-image:url(../../../src/asset/img/about.jpg)"><img src="../../../asset/img/logo.png"></div>
	<div class="banner" v-else-if="columnID == 3" style="background-image:url(../../../src/asset/img/info.jpg)"><img src="../../../asset/img/logo.png"></div>
	<div class="banner" v-else-if="columnID == 4" style="background-image:url(../../../src/asset/img/lawyer.jpg)"><img src="../../../asset/img/logo.png"></div>
	<div class="banner" v-else style="background-image:url(../../../src/asset/img/news.jpg)"><img src="../../../asset/img/logo.png"></div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				columnID: this.$route.params.columnID,
			}
		},
		watch: {
			'$route': 'getColumnID',
		},
		methods: {
			getColumnID: function() {
				this.columnID = this.$route.params.columnID
			}
		},
	}
</script>

<style lang="sass">
	.banner {
		position: relative;
		width: 100%;
		height: 12.5rem;
		background-color: white;
		background-position: right center;
		background-repeat: no-repeat;
		background-size: cover;

		img {
			display: block;
			position: absolute;
			top: 3.125rem;
			left: 4.16666667rem;
			max-height: 6.25rem;
		}
	}

@media only screen and (max-width: 480px) {
	.banner {
		height: 8.33333333rem;

		img {
			top: 2.08333333rem;
			left: 1.25rem;
			max-height: 4.16666667rem;
		}
	}
}
</style>