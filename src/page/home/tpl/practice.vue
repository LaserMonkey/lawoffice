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
				groupNum: 4,
			}
		},
		mounted: function () {
			if(localStorage.getItem("lang") != null) {
				this.lang = localStorage.getItem("lang")
			}
			this.columnID = this.$route.params.columnID
			this.loadPractice()
		},
		watch: {
			'$store.getters.lang': 'changeLang'
		},
		methods: {
			changeLang: function() {
				if(localStorage.getItem("lang") != null) {
					this.lang = localStorage.getItem("lang")
				}
				this.loadPractice()
			},
			loadPractice: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=practices&m=index&lang=' + _self.lang,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					let dataList = data.list
    					if(dataList.length != 0) {
    						for(let i = 0; i < dataList.length; i++) {
    							if(dataList[i].list.length != 0) {
    								let dataGroupList = dataList[i].list
    								let groupList = []
    								let group = []
    								for(let j = 0; j < dataGroupList.length; j++) {
    									if(j == 0 || (j != 0 && j%_self.groupNum !=0)) {
    										group.push(dataGroupList[j])
    									} else {
    										groupList.push(group)
    										group = []
    										group.push(dataGroupList[j])
    									}
    									if(j == dataGroupList.length-1) {
    										groupList.push(group)
    									}
    								}
    								console.log(dataList[i])
    								console.log(groupList)
    								dataList[i].push('groupList', groupList)
    							}
    						}
    					}
    					_self.practiceList = dataList
    					console.log(_self.practiceList)
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

@media only screen and (max-width: 480px) {
	.practice {
		padding: 1.66666667rem 1.25rem;

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
			margin-bottom: 0;
			padding: 0;

			li {
				float: left;
				width: 50%;
				height: auto;
				margin-bottom: 1.66666667rem;
				padding: 0 1.25rem;

				.name {
					display: block;
					width: 100%;
					line-height: 5rem;
					background-color: #f5f5f5;
					text-align: center;
					font-size: 1.4rem;
					margin-bottom: 0;
				}
			}
		}
	}
}
</style>