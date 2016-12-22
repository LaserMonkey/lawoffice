<template>
	<div class="articletype">
		<div class="article-type">
			<label>口口口口：</label>
			<select name="articleType" v-model="articleTypeID" @change="getArticleList()">
				<option v-for="(articleType, index) in articleTypeList" :value="articleType.id" :disabled="articleType.disable == 0 ? true : false">{{articleType.name1}}</option>
			</select>
			<label>口口：</label>
			<select name="articleLang" v-model="lang" @change="getArticleList()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按文章标题模糊查询" v-model="search" @keyup.enter="getArticleList()">
		</div>
		<div class="add-article">
			<button @click="$router.push('/article')">口口口口</button>
		</div>
		<ul class="z-table">
			<li class="article-list-frist">
				<h3 class="article-title">口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
			<li v-for="(article, index) in articleList">
				<h3 class="article-title">{{article.title}}</h3>
				<div>{{article.type_name}}</div>
				<time :datetime="getMyDate(article.dateline)" :alt="getMyDate(article.dateline)">{{getMyDate(article.dateline)}}</time>
				<div>
					<router-link :to="{name: 'article', query: {articleid: article.id}}">口口</router-link>
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
				articleList: [],
				articleTypeList: [],
				articleTypeID: '0',
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
				this.init()
			})
		},
		methods: {
			init: function() {
				this.getArticleTypeList()
			},
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
			}
		}
	}
</script>

<style lang="sass">
	.articletype {
		margin-left: 200px;
		padding-bottom: 20px;
		background-color: #fafafa;
		
		.article-type {
			padding: 30px 40px 20px;
		}
		
		.add-article {
			padding: 0 20px 10px;
		}

		.z-table {
			padding-bottom: 20px;
			border-top: solid 1px rgba(0, 0, 0, 0.1);

			li {
				display: flex;
				padding: 16px 40px;
				border-bottom: solid 1px rgba(0, 0, 0, 0.1);
				font-size: 1.4rem;
				background-color: white;
				flex-wrap: wrap;
				align-items: flex-start;
				align-content: flex-start;

				h3 {
					width: 40%;
					padding-right: 20px;
					font-size: 1.4rem;
					font-weight: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				div {
					width: 20%;
					padding-right: 20px;

					a {
						color: #df001f;
					}

					span {
						margin-left: 10px;
						color: #df001f;
						cursor: pointer;
					}
				}

				time {
					display: block;
					width: 20%;
					padding-right: 20px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

			}

			.z-table-frist {
				color: rgba(0, 0, 0, 0.6);
				background-color: #fffef7;
			}
		}
	}
</style>