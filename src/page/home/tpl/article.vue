<template>
	<div class="article-list" :class="!mobile ? 'z-clearfix' : ''">
		<ul class="menu">
			<li v-for="type in typeList" :class="typeID == type.id ? 'action' : ''">
				<router-link :to="{name: 'news', params: {columnID: columnID}, query: {lang: lang, type: type.id}}">{{type.name}}</router-link>
			</li>
		</ul>
		<div class="article">
			<h2>{{title}}</h2>
			<div class="article-info">
				<label>来源：</label><span>{{source}}</span><time>{{addTime | dateFormat('yyyy年MM月dd日&nbsp;&nbsp;hh:mm:ss')}}</time>
			</div>
			<div class="article-content" v-html="content"></div>
			<div class="lawyer-link" v-if="attachmentList.length != 0">
				<h3>相关附件</h3>
				<ul class="z-clearfix">
					<li v-for="attachment in attachmentList" class="attachment">
						<a :href="'/uploads' + attachment.url">{{attachment.name}}</a>
					</li>
				</ul>
			</div>
			<div class="lawyer-link" v-if="lawyerList.length != 0">
				<h3>相关律师</h3>
				<ul class="z-clearfix">
					<li v-for="lawyer in lawyerList">
						<router-link :to="{name: 'lawyerdetail', params:{columnID: 4}, query: {lang: lang, id: lawyer.id}}" target="_blank">
							<div class="name">{{lawyer.name}}</div>
							<div class="duty">{{lawyer.type}}</div>
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
				mobile: false,
				attachmentList: [],
			}
		},
		mounted: function () {
			if(navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
				this.mobile = true
			} else {
				this.mobile = false
			}
			this.init()
		},
		watch: {
			'$route': 'init',
			'$store.getters.lang': 'init'
		},
		methods: {
			init: function() {
				if(localStorage.getItem("lang") != null) {
					this.lang = localStorage.getItem("lang")
				}
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
    					_self.attachmentList = data.attachment
    					document.title = _self.title
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
		},
		filters:{
			dateFormat: function(value, fmt) {
				let date = new Date(value*1000)
				let o = {
					"M+": date.getMonth() + 1, //月份 
					"d+": date.getDate(), //日 
					"h+": date.getHours(), //小时 
					"m+": date.getMinutes(), //分 
					"s+": date.getSeconds(), //秒 
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
					"S": date.getMilliseconds() //毫秒 
				}
				if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
				for(let k in o)
					if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
				return fmt
			}
		},
	}
</script>

<style lang="sass">
	.article-list {
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
				font-size: 1.8rem;
				cursor: pointer;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				a {
					display: block;
				}
			}

			.action {
				background-color: #df001f;
				color: white;
				cursor: default;

				a {
					color: white;
				}
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
				margin-bottom: 1.8rem;
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

				p {
					margin: 0;
					line-height: 2.6rem;
					font-size: 1.6rem;
				}
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

					.attachment {
						float: none;
						width: 100%;
						margin-bottom: 1rem;
						padding: 0 0.83333333rem;

						a {
							display: inline;
							width: 100%;
							padding-top: 1rem;
							background-color: white;
							text-align: left;
							font-size: 1.6rem;
							color: blueviolet;
						}
					}
				}
			}
		}
	}
	
@media only screen and (max-width: 480px) {
	.article-list {
		.menu {
			float: initial;
			width: 100%;
    		padding: 1rem;
    		border-bottom: solid 0.1rem rgba(0, 0, 0, 0.1);
			overflow-x: scroll;
			overflow-y: hidden;
			white-space: nowrap;

			li {
				display: inline-block;
				width: auto;
				height: auto;
				margin-bottom: 0;
				padding: 1rem 2.3rem;
				line-height: initial;
				font-size: 1.4rem;
				cursor: pointer;
			}

			.action {
				background-color: #df001f;
				cursor: default;

				a {
					color: white;
				}
			}
		}

		.article {
			float: initial;
			width: 100%;
			margin: 0;
    		padding: 1.5rem 0;
    		border: 0;

			h2 {
				margin-bottom: 1rem;
				padding: 0 1.5rem;
				font-size: 2rem;
				font-weight: normal;
				color: #444444;
			}

			.article-info {
				margin-bottom: 2rem;
				padding: 0 1.5rem;
				font-size: 1.2rem;
				color: #999999;

				label {
					margin-right: 0;
				}

				span {
					margin-right: 2rem;
				}
			}
		
			.article-content {
				margin-bottom: 3rem;
				padding: 0 1.5rem;
				font-size: 1.4rem;

				p {
					font-size: 1.6rem;
					line-height: 2.2rem;
				}
			}

			.lawyer-link {

				h3 {
					margin-bottom: 1rem;
					padding: 0 1.5rem;
					font-size: 1.6rem;
				}

				ul {
					margin-bottom: 1rem;
					padding: 0 1.25rem;

					li {
						float: left;
						width: 33.33333333%;
						margin-bottom: 1rem;
						padding: 0 0.25rem;

						a {
							display: block;
							width: 100%;
							height: 6rem;
							padding-top: 1.5rem;
							background-color: #f5f5f5;
							text-align: center;

							.name {
								font-size: 1.4rem;
								margin-bottom: 1rem;
							}

							.duty {
								font-size: 1rem;
								color: #999999;
							}
						}
					}
				}
			}
		}
	}
}
</style>