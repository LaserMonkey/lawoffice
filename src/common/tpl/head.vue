<template>
	<div class="head">
		<div class="z-clearfix setting">
			<ul class="about-us">
				<li v-on:click="getHomeData">联系我们{{ columnList }}</li>
				<li>加入陆通</li>
			</ul>
			<ul class="language">
				<li>中文简体</li>
				<li>中文繁體</li>
				<li>ENGLISH</li>
			</ul>
		</div>
		<ul class="column">
			<li v-for="(column, index) in columnList">
			<!-- v-bind:class="{ nowpage: index==selectItem }" -->
    			{{ column.name }}
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default{
		data: function() {
			return {
				columnID: 1,
				columnList: []
			}
		},
		beforeCreate: function () {
			this.$nextTick(function () {
				this.init()
			})
		},
		// mounted: function () {
		// 	this.$nextTick(function () {
		// 		this.init()
		// 	})
		// },
		methods: {
			init: function() {
				this.getHomeData()
			},
			getHomeData: function() {
				this.$http.get('http://www.lutong.com/api/index.php?lang=1&c=home&m=index').then((response) => {
    				this.columnList = response.data.column
  				}, (response) => {
    				console.log(response)
  				})
			}
		}
	}
</script>

<style lang="sass">
	.head {
		padding: 30px 40px 25px;

		li {
			display: inline-block;
			cursor: pointer;
		}

		.setting {
			margin-bottom: 10px;

			.about-us {
				float: left;

				li {
					margin-right: 40px;
				}
			}

			.language {
				float: right;
				margin-top: 3px;
				font-size: 12px;

				li {
					margin-left: 20px;
				}
			}
		}

		.column {
			font-size: 20px;

			li {
				margin-right: 40px;
			}

			.action {
				color: #df001f;
			}
		}
	}
</style>