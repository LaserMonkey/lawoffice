<template>
	<div class="article-list z-clearfix">
		<ul class="menu">
			<li class="action">关于陆通</li>
			<li>加入陆通</li>
			<li>联系我们</li>
		</ul>
		<div class="content">
			<h2>陆通简介</h2>
			<p>北京市陆通联合律师事务所（“陆通”或“我们”）创立于1992年，是中国改革开放后第一批成立的合伙制律师事务所。经过数年的稳健发展，陆通已成为中国最具历史沉淀的专业化精品律师事务所之一。</p>
			<p>陆通致力于为每一位客户提供量身定制的一站式法律服务，我们深刻理解中国商业和社会逻辑、洞悉市场的变革和发展，能够立足于客户需求，为客户的商业活动和权利保护提供全面、安全和切实有效的法律支持。</p>
			<p>陆通持续专注在争议解决、公司和投资、证券、银行和金融、国际贸易、知识产权和劳动法等领域，涉足行业包括金融、保险、医疗、房地产、航天航空等传统行业、亦包括科技、文化、体育和娱乐等新兴行业。</p>
			<p>陆通拥有一支执业经验丰富、解决问题能力强大、并锐意进取的律师团队。陆通律师均毕业于国内外知名法学院，具有丰富的法律实践经验、深厚的理论基础和创新精神，平均执业年限超过10年以上。我们注重团队协作，亦重视团队的稳定性，保证能够为我们的客户提供连贯的高质量法律服务。</p>
			<p>在二十余年的执业过程中，陆通与各级政府部门、司法部门、仲裁机构以及各大法学院校和学术界均保持着良好的业务关系和交流渠道。同时，陆通与美国、英国、德国、法国、加拿大、日本、西班牙、香港特别行政区及台湾地区等国家和地区的多家知名律师事务所建立了良好的合作关系。基于陆通贯穿境内外的优质合作资源，我们有能力在全球化视野下为客户提供有力的法律服务支持、满足客户的发展目标。</p>
			<p>自创立以来，陆通多次获得中国司法部、北京市司法局、中华全国律师协会以及北京市律师协会等行业主管单位的奖励和表彰。同时，陆通始终具有深刻的社会责任感，陆通及陆通律师参与公益活动的历史自1992年至今已超过23年。</p>
			<h2>陆通价值观</h2>
			<p>陆通始终以持续为客户提供专业定制化的法律服务、维护客户权益、实现客户需求为发展目标，并以坚持公益事业、推动社会良性发展为己任。</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: this.getColumnID
			}
		},
		computed: {
			getColumnID() {
	    		return this.$store.getters.columnID
			},
			getLang() {
	    		return this.$store.getters.lang
			}
		},
		created: function() {
			this.init()
		},
		watch: {
			'$route': 'init'
		},
		methods: {
			init: function() {
				console.log(this.$route.params.columnID)
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
		}

		.action {
			background-color: #df001f;
			color: white;
			cursor: default;
		}
	}

	.content {
		float: right;
		width: 70%;
		margin-top: 2.5rem;
		margin-bottom: 2.5rem;
		padding: 0.83333333rem 5rem 2.5rem;
		border-left: solid 0.08333333rem rgba(0, 0, 0, 0.1);

		h2 {
			margin-bottom: 2.5rem;
			font-size: 2.4rem;
			font-weight: normal;
		}

		p {
			margin-bottom: 2.5rem;
			line-height: 2.5rem;
			font-size: 1.8rem;
		}
	}
</style>