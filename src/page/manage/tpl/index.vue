<template>
	<div class="index z-main-right">
		<h2>口口口口</h2>
		<ul>
			<li style="background-image:url()">
				<h3>口口口口</h3>
			</li>
			<li style="background-image:url()">
				<h3>口口口口</h3>
			</li>
			<li class="add-btn">+</li>
		</ul>
		<h2>口口口口</h2>
		<ul>
			<li style="background-image:url()">
				<h3>口口口口</h3>
			</li>
			<li style="background-image:url()">
				<h3>口口口口</h3>
			</li>
			<li class="add-btn">+</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				sliderList: [],
				hotList: []
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getSliderList()
				this.getHotList()
			})
		},
		methods: {
			getSliderList: function() {

			},
			getHotList: function() {

			}
		}
	}
</script>

<style lang="sass">
	.index {
		padding: 30px 40px;

		h2 {
			margin-bottom: 20px;
		}

		ul {
			display: flex;
			margin-bottom: 20px;
			flex-wrap: wrap;
			align-items: flex-start;
			align-content: flex-start;
			
			li {
				width: 20%;
				height: 120px;
				margin-right: 20px;
				margin-bottom: 20px;
				color: white;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;
				background-color: rgb(220, 220, 220);
			}

			.add-btn {
				font-size: 6rem;
				text-align: center;
				line-height: 120px;
				color: rgb(220, 220, 220);
				background-color: rgb(240, 240, 240);
				cursor: pointer;
			}
		}
	}
</style>