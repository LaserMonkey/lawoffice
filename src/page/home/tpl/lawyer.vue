<template>
	<div class="lawyer">
		<h2>路通律师</h2>
		<h3>{{partnerList.name}}</h3>
		<ul class="partner z-clearfix">
			<li v-for="partner in partnerList.list">
				<router-link :to="{name: 'lawyerdetail', params:{columnID:columnID}, query: {id: partner.id}}">
					<div class="name">{{partner.name}}</div>
					<div class="duty">合伙人</div>
				</router-link>
			</li>
		</ul>
		<h3>{{lawyerList.name}}</h3>
		<ul class="lawyer z-clearfix">
			<li v-for="lawyer in lawyerList.list">
				<router-link :to="{name: 'lawyerdetail', params:{columnID:columnID}, query: {id: lawyer.id}}">
					<div class="name">{{lawyer.name}}</div>
					<div class="duty">律师</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: 4,
				partnerList: [],
				lawyerList: [],
				lang: 1,
			}
		},
		mounted: function () {
			if(localStorage.getItem("lang") != null) {
				this.lang = localStorage.getItem("lang")
			}
			this.columnID = this.$route.params.columnID
			this.loadLawyer()
		},
		watch: {
			'$store.getters.lang': 'changeLang'
		},
		methods: {
			changeLang: function() {
				if(localStorage.getItem("lang") != null) {
					this.lang = localStorage.getItem("lang")
				}
				this.loadLawyer()
			},
			loadLawyer: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=lawyers&m=index&lang=' + _self.lang,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.partnerList = data.list[0]
    					_self.lawyerList = data.list[1]
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
	.lawyer {
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

		.lawyer {

			li {
				width: 20%;
			}
		}
	}

@media only screen and (max-width: 480px) {
	.lawyer {
		padding: 1.66666667rem 0;

		h2 {
			margin-bottom: 0.83333333rem;
			padding: 0 1.25rem;
			font-size: 1.8rem;
		}

		h3 {
			margin-bottom: 0.83333333rem;
			padding: 0 1.25rem;
			font-size: 1.2rem;
		}

		ul {
			margin-bottom: 1.66666667rem;
			padding: 0;

			li {
				float: left;
				width: 50%;
				margin-bottom: 1.66666667rem;
				padding: 0 1.25rem;

				a {
					display: block;
					width: 100%;
					height: 5rem;
					padding-top: 1rem;
					background-color: #f5f5f5;
					text-align: center;

					.name {
						font-size: 1.4rem;
						margin-bottom: 0.5rem;
					}

					.duty {
						font-size: 1rem;
						color: #999999;
					}
				}
			}
		}

		.lawyer {

			li {
				width: 50%;
			}
		}
	}
}
</style>