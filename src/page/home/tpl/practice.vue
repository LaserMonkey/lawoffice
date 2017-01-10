<template>
	<div class="practice">
		<h2>业务领域</h2>
		<div v-for="(practiceType, index) in practiceList" v-if="practiceType.list.length != 0">
			<h3>{{practiceList[index].name}}</h3>
			<div v-for="(groupList, groupListIndex) in practiceType.groupList">
				<ul class="practice z-clearfix">
					<li v-for="group in groupList" @click="showPracticeDetail(groupList.id, group.id)">
						<div class="name">{{group.title}}</div>
					</li>
				</ul>
				<div class="practiceDetail" :class="groupList.id == groudListID ? 'show-detail' : ''" v-html="content"></div>
			</div>
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
				practiceID: 0,
				groudListID: 0,
				content: "",
			}
		},
		mounted: function () {
			if(navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
				this.groupNum = 2
			} else {
				this.groupNum = 4
			}
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
    										group.id = (i+1)*10 + (j+1)
    										groupList.push(group)
    										group = []
    										group.push(dataGroupList[j])
    									}
    									if(j == dataGroupList.length-1) {
    										group.id = (i+1)*10 + (j+1)
    										groupList.push(group)
    									}
    								}
    								dataList[i].groupList = groupList
    							}
    						}
    					}
    					_self.practiceList = dataList
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			showPracticeDetail: function(groudListID, practiceID) {
				if(this.practiceID != practiceID) {
    				this.content = ""
					this.groudListID = groudListID
					this.practiceID = practiceID
					this.loadPracticeDetail()
				}
			},
			loadPracticeDetail: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=practices&m=get_practices_info&lang=' + _self.lang + '&id=' + _self.practiceID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.content = data.info.content
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
			margin-top: 1.66666667rem;
			padding: 0 2.5rem;

			li {
				float: left;
				width: 25%;
				padding: 0 0.83333333rem;
				height: 8.33333333rem;
				cursor: pointer;

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

		.practiceDetail {
			display: none;
			margin-top: 1.66666667rem;
			margin-bottom: 1.66666667rem;
			padding: 3.33333333rem 8.33333333rem;
			border-top: solid 0.08333333rem #e6e6e6;
			border-bottom: solid 0.08333333rem #e6e6e6;
		}

		.show-detail {
			display: block;
		}
	}

@media only screen and (max-width: 480px) {
	.practice {
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
			margin-bottom: 0;
			padding: 0;

			li {
				float: left;
				width: 50%;
				height: auto;
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