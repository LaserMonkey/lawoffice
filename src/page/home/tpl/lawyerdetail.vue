<template>
	<div class="lawyer-detail z-clearfix">
		<div class="lawyer-detail-left">
			<div class="lawyer-name">{{name}}</div>
			<div class="lawyer-duty">{{type}}</div>
			<div class="lawyer-info" v-html="content"></div>
			<div class="lawyer-report">
				<div class="lawyer-report-title" v-if="articleLinkList.length != 0">相关报告</div>
				<ul>
					<li v-for="articleLink in articleLinkList">{{articleLink.title}}</li>
				</ul>
			</div>
		</div>
		<div class="lawyer-detail-right">
			<img :src="lawyerImg">
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: 4,
				lawyerID: 0,
				lang: 1,
				content: "",
				lawyerImg: "",
				name: "",
				type: "",
				articleLinkList: [],
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
				if(localStorage.getItem("lang") != null) {
					this.lang = localStorage.getItem("lang")
				}
				this.columnID = this.$route.params.columnID
				this.lawyerID = this.$route.query.id
				this.loadLawyerInfo()
			},
			loadLawyerInfo: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=lawyers&m=get_lawyers_info&lang=' + _self.lang + '&id=' + _self.lawyerID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
						_self.content = data.info.content
						_self.lawyerImg = data.info.img
						_self.name = data.info.name
						_self.type = data.info.type
						_self.articleLinkList = data.article
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			}
		}
	}
</script>

<style lang="sass">
	.lawyer-detail {
		padding: 5rem 13.333333333rem;

		.lawyer-detail-left {
			float: left;
			width: 60%;

			.lawyer-name {
				margin-bottom: 2.5rem;
				font-size: 3.6rem;
				font-weight: 600;
			}

			.lawyer-duty {
				margin-bottom: 4.16666667rem;
				font-size: 2rem;
				color: #999999;
			}

			.lawyer-info {
				margin-bottom: 3.33333333rem;
				padding-bottom: 0.83333333rem;
				border-bottom: solid 0.08333333rem #E6E6E6;
				font-size: 2rem;
				color: #666666;
			}

			.lawyer-report {
				font-size: 2rem;

				.lawyer-report-title {
					margin-bottom: 1.66666667rem;
				}
				
				ul {

					li {
						margin-bottom: 1.66666667rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #df001f;

						a {
							color: #df001f;
						}
					}
				}
			}
		}

		.lawyer-detail-right {
			float: right;
			width: 40%;

			img {
				width: 100%;
			}
		}
	}

@media only screen and (max-width: 480px) {
	.lawyer-detail {
		padding: 1.66666667rem 1.25rem;

		.lawyer-detail-left {
			float: initial;
			width: 100%;

			.lawyer-name {
				margin-bottom: 0.83333333rem;
				font-size: 1.8rem;
				font-weight: 400;
			}

			.lawyer-duty {
				margin-bottom: 1.25rem;
				font-size: 1.2rem;
				color: #999999;
			}

			.lawyer-info {
				margin-bottom: 1.66666667rem;
				border-bottom: solid 0.08333333rem #E6E6E6;
				font-size: 1.4rem;
				color: #666666;
			}

			.lawyer-report {
				font-size: 1.4rem;

				.lawyer-report-title {
					margin-bottom: 1.5rem;
				}
				
				ul {

					li {
						margin-bottom: 1.5rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #df001f;

						a {
							color: #df001f;
						}
					}
				}
			}
		}

		.lawyer-detail-right {
			display: none;
			float: right;
			width: 40%;

			img {
				width: 100%;
			}
		}
	}
}
</style>