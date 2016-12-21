<template>
	<div class="article">
		<div class="article-type">
			<label>口口口口：</label>
			<select name="articleType" v-model="articleTypeID">
				<option v-for="(articleType, index) in articleTypeList" :value="articleType.id" :disabled="articleType.disable == 0 ? true : false">{{articleType.name1}}</option>
			</select>
			<label>口口：</label>
			<select name="articleLang" v-model="lang">
				<option :value="lang">简体</option>
				<option :value="lang">繁體</option>
				<option :value="lang">ENGLISH</option>
			</select>
			<input placeholder="按文章标题模糊查询">
		</div>
		<div class="add-article">
			<button>口口口口</button>
		</div>
		<ul>
			<li class="article-list-frist">
				<h3 class="article-title">口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
			<li>
				<h3 class="article-title">口口口口口口口口口口口口口口口口口口口口口口口口口口口口口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
			<li>
				<h3 class="article-title">口口口口口口口口口口口口口口口口口口口口口口口口口口口口口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
		</ul>
		<div class="page-ctrl z-clearfix">
			<div class="page-prev">上一页</div>
			<div class="page-num action">1</div>
			<div class="page-num">2</div>
			<div class="page-num">3</div>
			<div class="page-num">4</div>
			<div class="page-num">5</div>
			<div class="page-next">下一页</div>
			<div class="page-jump"><label>跳转到第</label><input type="number" min="1" :max="pageCount" v-model="pageNow"><label>页，共{{pageCount}}页</label></div>
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
			},
			getArticleList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_list&page=' + _self.pageNow + '&title=' + _self.search + '&type=' + _self.articleTypeID + '&lang=' + _self.lang + '&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.articleList = data.list
    					console.log(_self.articleList)
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
	.article {
		margin-left: 200px;
		padding-bottom: 20px;
		background-color: #fafafa;
		
		.article-type {
			padding: 30px 40px 20px;

			label {
				margin-right: 10px;
				font-size: 1.4rem;
			}

			select {
				min-width: 180px;
				height: 40px;
				margin-right: 40px;
				margin-bottom: 10px;
				padding-left: 15px;
				padding-right: 6.5%;
				border: solid 1px rgba(13, 5, 9, 0.1);
				font-size: 1.4rem;
				appearance:none;
				-moz-appearance:none;
				-webkit-appearance:none;
				background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
				background-position: 92%;
				background-color: white;

				&:-ms-expand {
					display: none;
				}

				option {
					height: 40px;
				}
			}
		}
		
		.add-article {
			padding: 0 20px 10px;
		}

		ul {
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
					font-size: 1.4rem;
					font-weight: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				div {
					width: 20%;
				}

				time {
					display: block;
					width: 20%;
				}

			}

			.article-list-frist {
				color: rgba(0, 0, 0, 0.6);
				background-color: #fffef7;
			}
		}

		.page-ctrl {
			width: 500px;
			margin: 0 auto 20px;
			font-size: 1.4rem;

			div {
				float: left;
				height: 24px;
				line-height: 24px;

				input {
					width: 40px;
					height: 24px;
					margin: 0 5px;
					padding: 5px 0px 5px 6px;
					font-size: 1.2rem;
				}
			}

			.page-num {
				width: 30px;
				margin: 0 5px;
				line-height: 23px;
				border: solid 1px rgba(13, 5, 9, 0.1);
				border-radius: 4px;
				background-color: #ffffff;
				text-align: center;
				cursor: pointer;
			}
			
			.action {
				color: white;
				border: solid 1px #df001f;
				background-color: #df001f;
			}

			.page-prev, .page-next {
				margin: 0 5px;
				cursor: pointer;
			}

			.page-jump {
				margin-left: 20px;
			}
		}
	}
</style>