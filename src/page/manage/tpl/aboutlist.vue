<template>
	<div class="aboutlist z-main-right">
		<div class="about-type">
			<label>口口：</label>
			<select name="aboutLang" v-model="lang" @change="getAboutList()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按标题模糊查询" v-model="search" @keyup.enter="getAboutList()">
		</div>
		<div class="add-about">
			<button @click="$router.push('/about')">口口口口</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="about-title">口口</h3>
				<time>口口口口</time>
				<div>口口</div>
			</li>
			<li v-for="(about, index) in aboutList">
				<h3 class="about-title">{{about.title}}</h3>
				<time :datetime="getMyDate(about.dateline)" :alt="getMyDate(about.dateline)">{{getMyDate(about.dateline)}}</time>
				<div>
					<router-link :to="{name: 'about', query: {aboutid: about.id}}">口口</router-link>
					<span @click="">口口</span>
				</div>
			</li>
		</ul>
		<div class="z-page-ctrl z-clearfix">
			<div class="z-page-prev">上一页</div>
			<div class="z-page-num action">1</div>
			<div class="z-page-num">2</div>
			<div class="z-page-num">3</div>
			<div class="z-page-num">4</div>
			<div class="z-page-num">5</div>
			<div class="z-page-next">下一页</div>
			<div class="z-page-jump"><label>跳转到第</label><input type="number" min="1" :max="pageCount" v-model="pageNow"><label>页，共{{pageCount}}页</label></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				aboutList: [],
				lang: 1,
				pageCount: 1,
				pageNow: 1,
				perpage: 10,
				pagePrev: false,
				pageNext: false,
				totals: 2,
				search: "",
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getAboutList()
			})
		},
		methods: {
			getAboutList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=about&m=index&page=' + _self.pageNow + '&name=' + _self.search + '&lang=' + _self.lang + '&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.aboutList = data.list
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			getMyDate: function(time) {
				return (new Date(parseInt(time) * 1000)).toLocaleString()
			}
		}
	}
</script>

<style lang="sass">
	.aboutlist {
		padding-bottom: 20px;
		
		.about-type {
			padding: 30px 40px 20px;
		}
		
		.add-about {
			padding: 0 20px 15px;
		}

		.z-table {

			li {

				h3 {
					width: 20%;
				}

				div {
					width: 50%;
				}

				time {
					width: 30%;
				}

			}
		}
	}
</style>