<template>
	<div class="head z-clearfix">
		<img src="">
		<h1>标题</h1>
		<span class="logout">退出</span>
		<span>用户名</span>
	</div>
</template>

<style lang="sass">
	.head {
		width: 100%;
		padding: 20px 40px 20px 25px;
		color: white;
		background-color: #df001f;

		img {
			display: block;
			float: left;
			height: 40px;
			margin-right: 35px;
		}

		h1 {
			float: left;
			margin-top: 10px;
			font-size: 1.6rem;
			font-weight: normal;
		}

		span {
			display: block;
			float: right;
			margin-left: 20px;
			margin-top: 13px;
		}

		.logout {
			cursor: pointer;
		}
	}
</style>