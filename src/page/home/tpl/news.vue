<template>
	<div class="new-list" :class="!mobile ? 'z-clearfix' : ''">
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
					<time>{{article.addtime | dateFormat('yyyy年MM月dd日&nbsp;&nbsp;hh:mm:ss')}}</time>
				</router-link>
			</li>
		</ul>
		<div class="z-page-ctrl z-clearfix">
			<div class="z-page-prev" @click="goPage(pageNow-1)" v-show="pageNow != 1">上一页</div>
			<div class="z-page-num" v-for="pageBtn in pageBtnList" :class="pageBtn == pageNow ? 'action' : ''" @click="goPage(pageBtn)">{{pageBtn}}</div>
			<div class="z-page-next" @click="goPage(pageNow+1)" v-show="pageNow != pageCount">下一页</div>
			<div class="z-page-jump" v-if="!mobile"><label>跳转到第</label><input type="number" min="1" :max="pageCount" v-model="pageInput" @keyup.enter="goPage(pageInput)"><label>页，共{{pageCount}}页</label></div>
		</div>
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
				pageCount: 1,
				pageNow: 1,
				perpage: 10,
				pageInput: 1,
				pagePrev: false,
				pageNext: false,
				totals: 2,
				pageBtnList: [],
				mobile: false,
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
	.new-list {
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
				cursor: default;

				a {
					color: white;
				}
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
					font-size: 2.2rem;
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
	}

@media only screen and (max-width: 480px) {
	.new-list {
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

		.news {
			float: initial;
			width: 100%;
			margin: 0;
    		padding: 2rem 1.5rem 0 1.5rem;

			li {
				margin-bottom: 2rem;
				padding: 0;
	
				h2 {
					margin-bottom: 0.41666667rem;
					font-size: 1.8rem;
					font-weight: normal;
					color: #444444;
				}

				p {
					margin-top: 0;
					margin-bottom: 0.41666667rem;
					line-height: 2.5rem;
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

		.z-page-ctrl {
			float: initial;
			width: 100%;
			text-align: center;

			div {
				display: inline-block;
				float: initial;
			}
		}
	}
}
</style>