<template>
	<div class="lawyer-detail z-clearfix">
		<div class="lawyer-detail-left">
			<div class="lawyer-name">刘盈子</div>
			<div class="lawyer-duty">律师</div>
			<div class="lawyer-info">业务范围
文化、体育和娱乐、知识产权、公司与投资

代表业绩
刘盈子律师专注于文化、体育、娱乐、科技和传媒领域，在该等领域内提供全方位法律服务。近年特色业绩包括：
			工作经历
2016年至今，于北京市陆通联合律师事务所，任律师
此前曾分别于金杜律师事务所及浩天信和律师事务所任职

教育背景
毕业于美国福特汉姆大学法学院，获法学硕士（LL.M.）
毕业于首都经济贸易大学法学院，获法学学士

执业资格
中华人民共和国执业律师

学术成果/社会活动
2014年，《金融知识产权整体保护研究》联合作者，收录于北京市朝阳区律师协会知识产权业务研究会编著、北京大学出版社于2014年出版的《知识产权新动向：实务与精要》一书
2014年，北京市律师协会《律师讲坛》（第十四讲）“明星与演艺法律服务”主讲人

工作语言
中文、英文</div>
			<div class="lawyer-report">
				<div class="lawyer-report-title">相关报告</div>
				<ul>
					<li>陆通律师为阳光保险发起设立泓德基金提供法律服务</li>
					<li>大成律师全程参与国寿渝富基金设立的法律服务</li>
				</ul>
			</div>
		</div>
		<div class="lawyer-detail-right">
			<img src="">
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: 4,
				lawyerID: 0,
			}
		},
		mounted: function () {
			this.init()
		},
		watch: {
			'$route': 'init'
		},
		methods: {
			init: function() {
				this.columnID = this.$route.params.columnID
				this.lawyerID = this.$route.query.id
				this.loadLawyerInfo()
			},
			loadLawyerInfo: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=lawyers&m=get_lawyers_info&id=' + _self.lawyerID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {

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
		}
	}
</style>