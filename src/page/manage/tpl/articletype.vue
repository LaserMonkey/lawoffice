<template>
	<div class="articletype z-main-right">
		<div class="add-articletype">
			<button @click="openPopArticleType(-1, 0)">新增类型</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="articletype-name">简体名称</h3>
				<h3 class="articletype-name">繁体名称</h3>
				<h3 class="articletype-name">英文名称</h3>
				<time>最后修改时间</time>
				<div>操作</div>
			</li>
			<li v-for="(articleType, index) in articleTypeList">
				<h3 class="articletype-name">{{articleType.name1}}</h3>
				<h3 class="articletype-name">{{articleType.name2}}</h3>
				<h3 class="articletype-name">{{articleType.name3}}</h3>
				<time :datetime="getMyDate(articleType.dateline)">{{getMyDate(articleType.dateline)}}</time>
				<div class="options">
					<div :class="articleType.disable == '0' ? 'z-blockup-li z-clearfix' : 'z-using-li z-clearfix'" v-if="articleType.fixed == '0'">
						<span class="able" @click="blockup(articleType.id, articleType.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(articleType.id, articleType.disable, index, 0)">禁用</span>
					</div>
					<span @click="openPopArticleType(index, articleType.id)" v-if="articleType.fixed == '0'">编辑</span>
					<span @click="openPopSort(articleType.id, articleType.sort)">排序</span>
					<span @click="openPopDel(articleType.id)" v-if="articleType.fixed == '0'">删除</span>
				</div>
			</li>
		</ul>
		<div class="z-pop pop-articletype" v-show="showPopArticleType">
			<div class="pop-blank">
				<label>简体名称：</label>
				<input type="text" placeholder="请输入文章分类简体名称" v-model="nameCHS">
			</div>
			<div class="pop-blank">
				<label>繁体名称：</label>
				<input type="text" placeholder="请输入文章分类繁体名称" v-model="nameCHT">
			</div>
			<div class="pop-blank">
				<label>英文名称：</label>
				<input type="text" placeholder="请输入文章分类英文名称" v-model="nameEN">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="addArticleType()" v-show="showArticleTypeAddBtn">确定</button>
				<button @click="editArticleType()" v-show="showArticleTypeEditBtn">确定</button>
				<button class="z-pop-cancel" @click="closePopArticleType()">取消</button>
			</div>
		</div>
		<div class="z-pop z-pop-sort" v-show="showPopSort">
			<div class="z-sort">
				<label>设置排序：</label>
				<input type="number" min="0" v-model="articleTypeSort">
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
				articleTypeID: 0,
				articleTypeList: [],
				nameCHS: "",
				nameCHT: "",
				nameEN: "",
				showCover: false,
				showPopArticleType: false,
				showArticleTypeEditBtn: false,
				showArticleTypeAddBtn: false,
				showPopSort: false,
				articleTypeSort: 0,
				showPopDel: false,
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getArticleTypeList()
			})
		},
		methods: {
			getArticleTypeList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_type_list&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.articleTypeList = data.list
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			getMyDate: function(time) {
				return (new Date(parseInt(time) * 1000)).toLocaleString()
			},
			openPopArticleType: function(index, articleTypeID) {
				this.articleTypeID = articleTypeID
				if(index == -1) {
					this.nameCHS = ""
					this.nameCHT = ""
					this.nameEN = ""
					this.showArticleTypeEditBtn = false
					this.showArticleTypeAddBtn = true
				} else {
					this.nameCHS = this.articleTypeList[index].name1
					this.nameCHT = this.articleTypeList[index].name2
					this.nameEN = this.articleTypeList[index].name3
					this.showArticleTypeAddBtn = false
					this.showArticleTypeEditBtn = true
				}
				this.showCover = true
				this.showPopArticleType = true
			},
			addArticleType: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=add_article_type&token=' + _self.$store.getters.token + '&name1=' + _self.nameCHS + '&name2=' + _self.nameCHT + '&name3=' + _self.nameEN,
				).then((response) => {
					const data = response.data
					const status = response.data.status
					_self.closePopArticleType()
    				if(status === 1) {
    					_self.getArticleTypeList()
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopArticleType: function() {
				this.showCover = false
				this.showPopArticleType = false
			},
			blockup: function(articleTypeID, articleTypeDisable, index, action) {
				if(articleTypeDisable == action || (articleTypeDisable > '0' && action> '0')) {
					return
				}
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=disable_article_type&token=' + _self.$store.getters.token + '&id=' + articleTypeID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(articleTypeDisable == '0') {
    						articleTypeDisable = new Date().getTime()
    					} else {
    						articleTypeDisable = '0'
    					}
    					_self.articleTypeList[index].disable = articleTypeDisable
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editArticleType: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=update_article_type&token=' + _self.$store.getters.token + '&id=' + _self.articleTypeID + '&name1=' + _self.nameCHS + '&name2=' + _self.nameCHT + '&name3=' + _self.nameEN,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getArticleTypeList()
						_self.closePopArticleType()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopSort: function(articleTypeID, articleTypeSort) {
				this.articleTypeID = articleTypeID
				this.articleTypeSort = articleTypeSort
				this.showCover = true
				this.showPopSort = true
			},
			updateSort: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=sort_article_type&token=' + _self.$store.getters.token + '&id=' + _self.articleTypeID + '&sort=' + _self.articleTypeSort,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getArticleTypeList()
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
			openPopDel: function(articleTypeID) {
				this.articleTypeID = articleTypeID
				this.showCover = true
				this.showPopDel = true
			},
			del: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=del_article_type&token=' + _self.$store.getters.token + '&id=' + _self.articleTypeID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getArticleTypeList()
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
	.articletype {
		padding-top: 40px;
		padding-bottom: 20px;
		
		.add-articletype {
			padding: 0 20px 15px;
		}

		.z-table {

			li {

				h3 {
					width: 15%;
				}

				div {
					width: 30%;
				}

				time {
					width: 25%;
				}
			}
		}

		.pop-sure {
			margin-left: -150px;
		}

		.pop-articletype {
			margin-top: -165px;
			margin-left: -200px;

			input, select {
				width: 200px;
				margin-right: 0;
			}

			.pop-blank {
				margin-bottom: 10px;
			}
		}
	}
</style>