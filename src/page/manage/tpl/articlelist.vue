<template>
	<div class="articlelist z-main-right">
		<div class="article-type">
			<label>文章类型：</label>
			<select name="articleType" v-model="articleTypeID" @change="getArticleList()">
				<option v-for="(articleType, index) in articleTypeList" :value="articleType.id" :disabled="articleType.disable == 0 ? true : false">{{articleType.name1}}</option>
			</select>
			<label>语言：</label>
			<select name="articleLang" v-model="lang" @change="getArticleList()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按文章标题模糊查询" v-model="search" @keyup.enter="getArticleList()">
		</div>
		<div class="add-article">
			<button @click="$router.push('/article')">新建文章</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="article-title">标题</h3>
				<div class="article-list-type">文章类型</div>
				<time>最后修改时间</time>
				<div>操作</div>
			</li>
			<li v-for="(article, index) in articleList">
				<h3 class="article-title">{{article.title}}</h3>
				<div class="article-list-type">{{article.type_name}}</div>
				<time :datetime="article.dateline | dateFormat('yyyy年MM月dd日')">{{article.dateline | dateFormat('yyyy年MM月dd日')}}</time>
				<div class="options">
					<div :class="article.disable == '0' ? 'z-blockup-li z-clearfix' : 'z-using-li z-clearfix'">
						<span class="able" @click="blockup(article.id, article.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(article.id, article.disable, index, 0)">禁用</span>
					</div>
					<span @click="openLawyerPop(article.id)">关联</span>
					<router-link :to="{name: 'article', query: {articleid: article.id}}">编辑</router-link>
					<span @click="openPopDel(article.id)">删除</span>
				</div>
			</li>
		</ul>
		<div class="z-page-ctrl z-clearfix">
			<div class="z-page-prev" @click="goPage(pageNow-1)" v-show="pageNow != 1">上一页</div>
			<div class="z-page-num" v-for="pageBtn in pageBtnList" :class="pageBtn == pageNow ? 'action' : ''" @click="goPage(pageBtn)">{{pageBtn}}</div>
			<div class="z-page-next" @click="goPage(pageNow+1)" v-show="pageNow != pageCount">下一页</div>
			<div class="z-page-jump"><label>跳转到第</label><input type="number" min="1" :max="pageCount" v-model="pageInput" @keyup.enter="goPage(pageInput)"><label>页，共{{pageCount}}页</label></div>
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
		<div class="z-pop pop-lawyer" v-show="showPopLawyer">
			<div class="pop-blank">
				请选择要关联的律师
			</div>
			<ul class="link-lawyer">
				<li v-for="lawyer in lawyerList"><input type="checkbox" :id="lawyer.name+lawyer.id" :value="lawyer.id" v-model="checkedIdList"><label for="checkbox">{{lawyer.name}}</label></li>
			</ul>
			<div class="z-pop-action z-clearfix">
				<button @click="linkLawyer()">确定</button>
				<button class="z-pop-cancel" @click="cancelLinkLawyer()">取消</button>
			</div>
		</div>
		<div class="z-cover" v-show="showCover"></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				articleList: [],
				articleTypeList: [],
				articleTypeID: 1,
				lang: 1,
				search: "",
				articleID: 0,
				showPopDel: false,
				showCover: false,
				articleSort: "0",
				showPopSort: false,
				pageCount: 1,
				pageNow: 1,
				perpage: 10,
				pageInput: 1,
				pagePrev: false,
				pageNext: false,
				totals: 2,
				pageBtnList: [],
				showPopLawyer: false,
				lawyerList: [],
				checkedIdList: [],
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
    					_self.articleTypeID = data.list[0].id
    					_self.getArticleList()
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			getArticleList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_list&page=' + _self.pageNow + '&title=' + _self.search + '&type=' + _self.articleTypeID + '&lang=' + _self.lang + '&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.articleList = data.list
    					_self.pageCount = data.pages
    					_self.pageNow = data.page
    					_self.totals = data.totals
    					_self.getPageBtnList()
    					_self.loadLawyer()
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			loadLawyer: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=lawyers&m=get_lawyers_list_all&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.lawyerList = data.list
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			blockup: function(articleID, articleDisable, index, action) {
				if(articleDisable == action || (articleDisable > '0' && action> '0')) {
					return
				}
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=disable_article&token=' + _self.$store.getters.token + '&id=' + articleID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(articleDisable == '0') {
    						articleDisable = new Date().getTime()
    					} else {
    						articleDisable = '0'
    					}
    					_self.articleList[index].disable = articleDisable
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopDel: function(articleID) {
				this.articleID = articleID
				this.showCover = true
				this.showPopDel = true
			},
			del: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=del_article&token=' + _self.$store.getters.token + '&id=' + _self.articleID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getArticleList()
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
			goPage: function(pageNow) {
				if(pageNow >= 1 && pageNow <= this.pageCount && pageNow != this.pageNow) {
					this.pageNow = pageNow
					this.getArticleList()
				}
			},
			getPageBtnList: function() {
				this.pageBtnList = []
				if(this.pageNow >= this.pageCount-2) {
					if(this.pageCount <= 5) {
						for(let i = 1; i <= this.pageCount; i++) {
							this.pageBtnList.push(i)
						}
					} else {
						for(let i = this.pageCount-4; i <= this.pageCount; i++) {
							this.pageBtnList.push(i)
						}
					}
				} else if(this.pageNow < this.pageCount-2) {
					if(this.pageCount <= 5) {
						for(let i = 1; i <= this.pageCount; i++) {
							this.pageBtnList.push(i)
						}
					} else if(this.pageCount > 5 && this.pageNow <= 3) {
						for(let i = 1; i <= 5; i++) {
							this.pageBtnList.push(i)
						}
					} else {
						for(let i = this.pageNow-2; i <= this.pageNow+2; i++) {
							this.pageBtnList.push(i)
						}
					}
				}
			},
			openLawyerPop: function(articleID) {
				this.showPopLawyer = true
				this.showCover = true
				this.articleID = articleID
				this.loadLinkLawyerByArticleID(articleID)
			},
			loadLinkLawyerByArticleID: function(articleID) {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_correlated&token=' + _self.$store.getters.token + '&id=' + articleID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(data.list != null) {
    						_self.checkedIdList = []
    						for(let i = 0; i < data.list.length; i++) {
    							_self.checkedIdList.push(data.list[i].id)
    						}
    					}
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			linkLawyer: function() {
				const lawyerIdList = this.checkedIdList.join()
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=add_article_correlated&token=' + _self.$store.getters.token + '&id=' + _self.articleID + '&lawyers_id=' + lawyerIdList,
				).then((response) => {
					const data = response.data
					const status = response.data.status
					if(status === 1) {
						_self.checkedIdList = []
					} else if(status === 403) {
						_self.$router.push('/login')
					} else {
						alert('status: ' + status)
					}
				}, (response) => {
					// TODO 错误toast提示
				})
				this.closePopLawyer()
			},
			cancelLinkLawyer: function() {
				this.checkedIdList = []
				this.closePopLawyer()
			},
			closePopLawyer: function() {
				this.showPopLawyer = false
				this.showCover = false
			},
		},
		filters: {
			dateFormat: function(value, fmt) {
				let date = new Date(value * 1000)
				let o = {
					"M+": date.getMonth() + 1, //月份 
					"d+": date.getDate(), //日 
					"h+": date.getHours(), //小时 
					"m+": date.getMinutes(), //分 
					"s+": date.getSeconds(), //秒 
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
					"S": date.getMilliseconds() //毫秒 
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (let k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt
			}
		},
	}
</script>

<style lang="sass">
	.articlelist {
		padding-bottom: 20px;
		
		.article-type {
			padding: 30px 40px 20px;
		}
		
		.add-article {
			padding: 0 20px 15px;
		}

		.article-list-type {
			width: 10%;
		}

		ul {
			li {
				div {
					width: 30%;
				}
			}
		}

		.pop-lawyer {
			width: 420px;
			margin-top: -165px;
			margin-left: -210px;

			input, select {
				width: 200px;
				margin-right: 0;
			}

			.pop-blank {
				margin-bottom: 10px;
			}

			.link-lawyer {
				li {
					display: inline-block;
					width: 100px;

					input {
						width: 14px;
						height: 14px;
						margin: 3px 3px 3px 4px;
						padding: 0;
						vertical-align: middle;
						-webkit-appearance: checkbox;
					}

					label {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>