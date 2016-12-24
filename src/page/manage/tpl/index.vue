<template>
	<div class="index z-main-right">
		<div class="slider-type z-margin-bottom">
			<select name="sliderLang" v-model="lang" @change="getFresh()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按标题模糊查询" v-model="search" @keyup.enter="getFresh()">
		</div>
		<h2>轮播图管理</h2>
		<ul>
			<li v-for="(slider, index) in sliderList" :style="'background-image:url(' + slider.img + ')'" @click="openPopSlider(index)">
				<h3>{{slider.title}}</h3>
			</li>
			<li class="add-btn" @click="openPopSlider(-1)">+</li>
		</ul>
		<h2>热点文章管理</h2>
		<ul>
			<li v-for="(hot, index) in hotList" :style="'background-image:url(' + hot.img + ')'" @click="openPopHot(index)">
				<h3>{{hot.title1}}</h3>
			</li>
			<li class="add-btn">+</li>
		</ul>
		<div class="z-pop pop-add-slider" v-show="showPopSlider">
			<div class="pop-blank">
				<label>选择语言：</label>
				<select name="popSliderLang" v-model="sliderLang">
					<option value="1">简体</option>
					<option value="2">繁體</option>
					<option value="3">ENGLISH</option>
				</select>
			</div>
			<div class="pop-blank">
				<label>标题名称：</label>
				<input type="text" placeholder="请输入标题名称" v-model="sliderTitle">
			</div>
			<div class="pop-blank">
				<label>链接地址：</label>
				<input type="text" placeholder="请输入链接地址" v-model="sliderLink">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="addSlider()" v-show="showSliderAddBtn">确定</button>
				<button @click="editSlider()" v-show="showSliderEditBtn">确定</button>
				<button class="z-pop-cancel" @click="closePopSlider()">取消</button>
			</div>
		</div>
		<div class="z-pop pop-add-hot" v-show="showPopHot">
			<div class="pop-blank">
				<label>选择语言：</label>
				<select name="popHotLang" v-model="hotLang">
					<option value="1">简体</option>
					<option value="2">繁體</option>
					<option value="3">ENGLISH</option>
				</select>
			</div>
			<div class="pop-blank">
				<label>标题名称：</label>
				<input type="text" placeholder="请输入标题名称" v-model="hotTitle">
			</div>
			<div class="pop-blank">
				<label>链接地址：</label>
				<input type="text" placeholder="请输入链接地址" v-model="hotLink">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="addHot()" v-show="showHotAddBtn">确定</button>
				<button @click="editHot()" v-show="showHotEditBtn">确定</button>
				<button class="z-pop-cancel" @click="closePopHot()">取消</button>
			</div>
		</div>
		<div class="z-cover" v-show="showCover"></div>
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
				showCover: false,
				sliderLang: 1,
				sliderTitle: "",
				sliderLink: "",
				showPopSlider: false,
				showSliderAddBtn: true,
				showSliderEditBtn: false,
				hotLang: 1,
				hotTitle: "",
				hotLink: "",
				showPopHot: false,
				showHotAddBtn: true,
				showHotEditBtn: false,
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
			},
			getFresh: function() {
				this.getSliderList()
				this.getHotList()
			},
			openPopSlider: function(index) {
				if(index === -1) {
					this.sliderLang = 1
					this.sliderTitle = ""
					this.sliderLink = ""
					this.sliderEditBtn = false
					this.sliderAddBtn = true
				} else {
					this.sliderLang = this.sliderList[index].lang
					this.sliderTitle = this.sliderList[index].title
					this.sliderLink = this.sliderList[index].url
					this.showSliderAddBtn = false
					this.showSliderEditBtn = true
				}
				this.showCover = true
				this.showPopSlider = true
			},
			addSlider: function(index) {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=add_carousel&token=' + _self.$store.getters.token + '&lang=' + _self.sliderLang + '&title=' + _self.sliderTitle + '&url=' + _self.sliderLink,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getSliderList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editSlider: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=update_carousel&token=' + _self.$store.getters.token + '&lang=' + _self.sliderLang + '&title=' + _self.sliderTitle + '&url=' + _self.sliderLink,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getSliderList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopSlider: function() {
				this.showPopSlider = false
				this.showCover = false
			},
			openPopHot: function(index) {
				if(index === -1) {
					this.hotLang = 1
					this.hotTitle = ""
					this.hotLink = ""
					this.hotEditBtn = false
					this.hotAddBtn = true
				} else {
					this.hotLang = this.hotList[index].lang
					this.hotTitle = this.hotList[index].title
					this.hotLink = this.hotList[index].url
					this.showHotAddBtn = false
					this.showHotEditBtn = true
				}
				this.showCover = true
				this.showPopHot = true
			},
			addHot: function(index) {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=add_carousel&token=' + _self.$store.getters.token + '&lang=' + _self.hotLang + '&title=' + _self.hotTitle + '&url=' + _self.hotLink,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getHotList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editHot: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=update_carousel&token=' + _self.$store.getters.token + '&lang=' + _self.hotLang + '&title=' + _self.hotTitle + '&url=' + _self.hotLink,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getHotList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopHot: function() {
				this.showPopHot = false
				this.showCover = false
			},
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
				cursor: pointer;
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

		.pop-add-slider {
			margin-top: -150px;
			margin-left: -230px;

			.pop-blank {
				margin-bottom: 10px;

				select {
					margin-bottom: 0;
				}
			}
		}

		.pop-add-hot {
			margin-top: -150px;
			margin-left: -230px;

			.pop-blank {
				margin-bottom: 10px;

				select {
					margin-bottom: 0;
				}
			}
		}
	}
</style>