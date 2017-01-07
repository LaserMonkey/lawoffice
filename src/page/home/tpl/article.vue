<template>
	<div class="article-list z-clearfix">
		<ul class="menu">
			<li v-for="type in typeList" :class="typeID == type.id ? 'action' : ''">
				<router-link :to="{name: 'news', params: {columnID: columnID}, query: {type: type.id}}">{{type.name}}</router-link>
			</li>
		</ul>
		<div class="content">
			<h2>中国人民银行推出扩大全口径跨境融资宏观审慎管理试点</h2>
			<div>
				<label>来源：</label><span>新浪网</span><time></time>
			</div>
			<div>大成律师事务所 ( "大成" )成立于1992年，是中国成立最早、规模最大的综合性律师事务所。

大成自2004年起进行了从个体化作业向团队化作业转型，向规模化、规范化、专业化、品牌化、国际化方向发展的探索和改革。通过一系列的研究和改革，大成目前已实现了跨越式发展，不仅规模化建设取得明显成效，而且规范化、专业化、团队化建设也取得了丰硕成果。大成现已建立了先进的管理体制和专业化团队作业模式，奠定了有效控制业务质量的基础，建设了资源共享机制的路径。大成将坚持不懈地积极探索中国律师事务所品牌化、国际化的建设和发展道路。

大成拥有4000余名律师及其他专业人员。其中，大多数律师毕业于国内外知名的法学院校；多数律师取得了美、英、法、日、韩、俄等国一流法学院校学位，并具有在国际知名律师事务所工作的经验；相当数量的律师还具备国际贸易、金融、建筑工程、工商管理、会计、税务等其他专业背景。大成的律师及其他专业人员能够以英、法、日、韩、俄、蒙古等语言为客户提供服务。

大成作为一家大型的、综合性的律师事务所，始终贯彻最大程度维护客户利益的执业宗旨，为国内外客户及时提供专业的、全面的、务实的法律及商务解决方案。大成的主要专业领域包括：公司综合类业务、公司收购、兼并与重组、证券与资本市场、私募股权与投资基金、国企改制与产权交易、银行与金融、外商直接投资与外资并购、境外投资、反垄断与国家安全审查、税务、国际贸易、国际贸易救济与WTO业务、海商海事、知识产权、房地产与建设工程、矿业、能源与自然资源、诉讼仲裁、刑事辩护和劳动法等。</div>
			<div>
				<div>相关律师</div>
				<ul>
					<li>
						<div class="name">人名</div>
						<div class="duty">合伙人</div>
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
				this.typeID = this.$route.query.type
				this.articleID = this.$route.query.id
				this.loadType()
				this.loadArticle()
			},
			loadType: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=article&m=index&id=' + _self.typeID + '&page=1',
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
				this.$http.get('http://www.lutong.com/api/index.php?c=article&m=get_article_info&id=' + _self.articleID + '&page=' + _self.page,
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