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
			<button @click="$router.push('/about')">新增</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="about-title">标题</h3>
				<time>最后修改时间</time>
				<div>操作</div>
			</li>
			<li v-for="(about, index) in aboutList">
				<h3 class="about-title">{{about.title}}</h3>
				<time :datetime="getMyDate(about.dateline)" :alt="getMyDate(about.dateline)">{{getMyDate(about.dateline)}}</time>
				<div class="options">
					<div :class="about.disable == '0' ? 'z-blockup-li z-clearfix' : 'z-using-li z-clearfix'">
						<span class="able" @click="blockup(about.id, about.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(about.id, about.disable, index, 0)">禁用</span>
					</div>
					<router-link :to="{name: 'about', query: {aboutid: about.id}}">编辑</router-link>
					<span @click="openPopSort(about.id, about.sort)">排序</span>
					<span @click="openPopDel(about.id)">删除</span>
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
		<div class="z-pop z-pop-sort" v-show="showPopSort">
			<div class="z-sort">
				<label>设置排序：</label>
				<input type="number" min="0" v-model="aboutSort">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="updateSort()">确定</button>
				<button class="z-pop-cancel" @click="closePopSort()">取消</button>
			</div>
		</div>
		<div class="z-pop z-pop-del" v-show="showPopDel">
			<div class="pop-blank">
				确定要删除此项的操作？
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="del()">确定</button>
				<button class="z-pop-cancel" @click="closePopDel()">取消</button>
			</div>
		</div>
		<div class="z-cover" v-show="showCover"></div>
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
				aboutSort: "0",
				showPopSort: false,
				showCover: false,
				showPopDel: false,
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
			},
			blockup: function(aboutID, aboutDisable, index, action) {
				if(aboutDisable == action || (aboutDisable > '0' && action> '0')) {
					return
				}
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=about&m=disable_about&token=' + _self.$store.getters.token + '&id=' + aboutID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(aboutDisable == '0') {
    						aboutDisable = new Date().getTime()
    					} else {
    						aboutDisable = '0'
    					}
    					_self.aboutList[index].disable = aboutDisable
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopSort: function(aboutID, aboutSort) {
				this.aboutID = aboutID
				this.aboutSort = aboutSort
				this.showCover = true
				this.showPopSort = true
			},
			updateSort: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=about&m=sort_about&token=' + _self.$store.getters.token + '&id=' + _self.aboutID + '&sort=' + _self.aboutSort,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getAboutList()
    					_self.closePopSort()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopSort: function() {
				this.showPopSort = false
				this.showCover = false
			},
			openPopDel: function(aboutID) {
				this.aboutID = aboutID
				this.showCover = true
				this.showPopDel = true
			},
			del: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=about&m=del_about&token=' + _self.$store.getters.token + '&id=' + _self.aboutID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getAboutList()
    					_self.closePopDel()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopDel: function() {
				this.showPopDel = false
				this.showCover = false
			},
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