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
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: 5,
				typeID: 1,
				page: 1,
				typeList: [],
				articleList: [],
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