<template>
	<div class="practice">
		<h2>业务领域</h2>
		<div v-for="(practiceType, index) in practiceList" v-if="practiceType.list.length != 0">
			<h3>{{practiceList[index].name}}</h3>
			<ul class="practice z-clearfix">
				<li v-for="practice in practiceType.list">
					<div class="name">{{practice.title}}</div>
				</li>
			</ul>
			<div></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: 4,
				practiceList: [],
				lang: 1,
			}
		},
		mounted: function () {
			this.columnID = this.$route.params.columnID
			this.loadPractice()
		},
		watch: {
			'$store.getters.lang': 'changeLang'
		},
		methods: {
			changeLang: function() {
				this.lang = this.$store.getters.lang
				this.loadPractice()
			},
			loadPractice: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=practices&m=index&lang=' + _self.lang,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.practiceList = data.list
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
	.practice {
		padding: 5rem 0;

		h2 {
			margin-bottom: 3.33333333rem;
			padding: 0 3.33333333rem;
		}

		h3 {
			margin-bottom: 1.66666667rem;
			padding: 0 3.33333333rem;
		}

		ul {
			margin-bottom: 1.66666667rem;
			padding: 0 2.5rem;

			li {
				float: left;
				width: 25%;
				margin-bottom: 1.66666667rem;
				padding: 0 0.83333333rem;
				height: 8.33333333rem;

				.name {
					display: block;
					width: 100%;
					line-height: 8.33333333rem;
					background-color: #f5f5f5;
					text-align: center;
					font-size: 2.0rem;
					margin-bottom: 1.66666667rem;
				}
			}
		}
	}
</style>