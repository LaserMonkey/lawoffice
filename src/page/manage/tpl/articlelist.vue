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
				<time :datetime="getMyDate(article.dateline)" :alt="getMyDate(article.dateline)">{{getMyDate(article.dateline)}}</time>
				<div class="options">
					<div :class="article.disable == '0' ? 'z-blockup-li z-clearfix' : 'z-using-li z-clearfix'">
						<span class="able" @click="blockup(article.id, article.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(article.id, article.disable, index, 0)">禁用</span>
					</div>
					<router-link :to="{name: 'article', query: {articleid: article.id}}">编辑</router-link>
					<span @click="openPopDel(article.id)">删除</span>
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
				articleList: [],
				articleTypeList: [],
				articleTypeID: 1,
				lang: 1,
				pageCount: 1,
				pageNow: 1,
				perpage: 10,
				pagePrev: false,
				pageNext: false,
				totals: 2,
				search: "",
				articleID: 0,
				showPopDel: false,
				showCover: false,
				articleSort: "0",
				showPopSort: false,
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
		}
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
	}
</style>