<template>
	<div class="article-list z-clearfix">
		<ul class="menu">
			<li v-for="type in typeList" :class="typeID == type.id ? 'action' : ''">
				<router-link :to="{name: 'news', params: {columnID: columnID}, query: {type: type.id}}">{{type.name}}</router-link>
			</li>
		</ul>
		<ul class="news">
			<li v-for="article in articleList">
				<router-link :to="{name: 'article', params: {columnID: columnID}, query: {type: typeID, id: article.id}}">
					<h2>{{article.title}}</h2>
					<p>{{article.intro}}</p>
					<time>{{article.addtime}}</time>
				</router-link>
			</li>
		</ul>
		<div class="z-page-ctrl z-clearfix">
			<div class="z-page-prev" @click="goPage(pageNow-1)" v-show="pageNow != 1">上一页</div>
			<div class="z-page-num" v-for="pageBtn in pageBtnList" :class="pageBtn == pageNow ? 'action' : ''" @click="goPage(pageBtn)">{{pageBtn}}</div>
			<div class="z-page-next" @click="goPage(pageNow+1)" v-show="pageNow != pageCount">下一页</div>
			<div class="z-page-jump"><label>跳转到第</label><input type="number" min="1" :max="pageCount" v-model="pageInput" @keyup.enter="goPage(pageInput)"><label>页，共{{pageCount}}页</label></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: 0,
				typeID: 1,
				page: 1,
				typeList: [],
				articleList: [],
				lang: 1,
				pageCount: 1,
				pageNow: 1,
				perpage: 10,
				pageInput: 1,
				pagePrev: false,
				pageNext: false,
				totals: 2,
				pageBtnList: [],
			}
		},
		mounted: function () {
			this.init()
		},
		watch: {
			'$route': 'init',
			'$store.getters.lang': 'init'
		},
		methods: {
			init: function() {
				this.lang = this.$store.getters.lang
				this.columnID = this.$route.params.columnID
				this.typeID = this.$route.query.type
				this.loadNews()
			},
			loadNews: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=article&m=index&lang=' + _self.lang + '&id=' + _self.typeID + '&page=' + _self.page,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.typeList = data.type
    					_self.articleList = data.list
    					_self.pageCount = data.pages
    					_self.pageNow = data.page
    					_self.totals = data.totals
    					_self.getPageBtnList()
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			goPage: function(pageNow) {
				if(pageNow >= 1 && pageNow <= this.pageCount && pageNow != this.pageNow) {
					this.pageNow = pageNow
					this.loadNews()
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
			}
		}
	}
</script>

<style lang="sass">
	.menu {
		float: left;
		width: 30%;
		padding: 2.5rem 4.16666666rem 2.5rem 5rem;

		li {
			width: 100%;
			height: 5.83333333rem;
			margin-bottom: 0.83333333rem;
			line-height: 5.83333333rem;
			text-align: center;
			font-size: 2rem;
			cursor: pointer;

			a {
				display: block;
			}
		}

		.action {
			background-color: #df001f;
			color: white;
			cursor: default;
		}
	}

	.news {
		float: right;
		width: 70%;
		margin-top: 2.5rem;
		margin-bottom: 2.5rem;
		border-left: solid 0.08333333rem rgba(0, 0, 0, 0.1);

		li {
			padding: 3.33333333rem 6.35% 1.66666667rem;

			h2 {
				margin-bottom: 2rem;
				font-size: 2.8rem;
				font-weight: normal;
				color: #444444;
			}

			p {
				margin-bottom: 1.66666667rem;
				line-height: 2rem;
				font-size: 1.6rem;
				color: #666666;
			}

			time {
				display: block;
				font-size: 1.4rem;
				color: #999999;
			}

			&:hover {
				background-color: #FAFAFA;

				h2 {
					color: #df001f;
				}
			}
		}

	}
</style>