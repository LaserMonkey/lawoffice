<template>
	<div class="article-list z-clearfix">
		<ul class="menu">
			<li v-for="type in typeList" :class="typeID == type.id ? 'action' : ''">
				<router-link :to="{name: 'news', params: {columnID: columnID}, query: {type: type.id}}">{{type.name}}</router-link>
			</li>
		</ul>
		<div class="article">
			<h2>{{title}}</h2>
			<div class="article-info">
				<label>来源：</label><span>{{source}}</span><time>{{addTime}}</time>
			</div>
			<div class="article-content" v-html="content"></div>
			<div class="lawyer-link" v-if="lawyerList.length != 0">
				<h3>相关律师</h3>
				<ul>
					<li v-for="lawyer in lawyerList.list">
						<router-link :to="{name: 'lawyerdetail', params:{columnID:columnID}, query: {id: lawyer.id}}">
							<div class="name">{{lawyer.name}}</div>
							<div class="duty">律师</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: 0,
				typeID: 0,
				articleID: 0,
				page: 1,
				typeList: [],
				lawyerList: [],
				addTime: "",
				content: "",
				source: "",
				title: "",
				lang: 1,
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
				this.articleID = this.$route.query.id
				this.loadType()
				this.loadArticle()
			},
			loadType: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=article&m=index&lang=' + _self.lang + '&id=' + _self.typeID + '&page=1',
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.typeList = data.type
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			loadArticle: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=article&m=get_article_info&lang=' + _self.lang + '&id=' + _self.articleID + '&page=' + _self.page,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
						_self.addTime = data.info[0].addtime,
						_self.content = data.info[0].content,
						_self.source = data.info[0].source,
						_self.title = data.info[0].title,
    					_self.lawyerList = data.lawyers
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
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

	.article {
		float: right;
		width: 70%;
		margin-top: 2.5rem;
		margin-bottom: 2.5rem;
		padding: 2.5rem 0;
		border-left: solid 0.08333333rem rgba(0, 0, 0, 0.1);

		h2 {
			margin-bottom: 2rem;
			padding: 0 5rem;
			font-size: 3rem;
			font-weight: normal;
			color: #444444;
		}

		.article-info {
			margin-bottom: 2.5rem;
			padding: 0 5rem;
			font-size: 1.4rem;
			color: #999999;

			label {
				margin-right: 0;
			}

			span {
				margin-right: 2.5rem;
			}
		}
		
		.article-content {
			margin-bottom: 2.5rem;
			padding: 0 5rem;
			font-size: 1.8rem;
		}

		.lawyer-link {

			h3 {
				margin-bottom: 1.66666667rem;
				padding: 0 5rem;
				font-size: 2.4rem;
			}

			ul {
				margin-bottom: 1.66666667rem;
				padding: 0 4.16666667rem;

				li {
					float: left;
					width: 33.33333333%;
					margin-bottom: 1.66666667rem;
					padding: 0 0.83333333rem;

					a {
						display: block;
						width: 100%;
						height: 10rem;
						padding-top: 2.5rem;
						background-color: #f5f5f5;
						text-align: center;

						.name {
							font-size: 2.0rem;
							margin-bottom: 1.66666667rem;
						}

						.duty {
							font-size: 1.6rem;
							color: #999999;
						}
					}
				}
			}
		}
	}
</style>