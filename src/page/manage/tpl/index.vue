<template>
	<div class="index z-main-right">
		<div class="slider-type z-margin-bottom">
			<select name="sliderLang" v-model="lang" @change="getSliderList()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按标题模糊查询" v-model="search" @keyup.enter="getSliderList()">
		</div>
		<h2>轮播图管理</h2>
		<ul>
			<li style="background-image:url()">
				<h3>口口口口</h3>
			</li>
			<li style="background-image:url()">
				<h3>口口口口</h3>
			</li>
			<li class="add-btn">+</li>
		</ul>
		<h2>热点文章管理</h2>
		<ul>
			<li style="background-image:url()">
				<h3>口口口口</h3>
			</li>
			<li style="background-image:url()">
				<h3>口口口口</h3>
			</li>
			<li class="add-btn">+</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				sliderList: [],
				hotList: [],
				lang: 1,
				search: "",
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getSliderList()
				this.getHotList()
			})
		},
		methods: {
			getSliderList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=get_carousel_list&token=' + _self.$store.getters.token + '&lang=' + _self.lang + '&title=' + _self.search,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.sliderList = data.list
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			getHotList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=get_custom_list&token=' + _self.$store.getters.token + '&lang=' + _self.lang + '&title=' + _self.search,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.hotList = data.list
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			}
		}
	}
</script>

<style lang="sass">
	.index {
		padding: 30px 40px;

		h2 {
			margin-bottom: 10px;
			font-size: 2.0rem
		}

		ul {
			display: flex;
			margin-bottom: 20px;
			flex-wrap: wrap;
			align-items: flex-start;
			align-content: flex-start;
			
			li {
				width: 20%;
				height: 120px;
				margin-right: 20px;
				margin-bottom: 20px;
				color: white;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;
				background-color: rgb(220, 220, 220);
			}

			.add-btn {
				font-size: 6rem;
				text-align: center;
				line-height: 120px;
				color: rgb(220, 220, 220);
				background-color: rgb(240, 240, 240);
				cursor: pointer;
			}
		}
	}
</style>