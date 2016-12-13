<template>
	<div class="head">
		<div class="z-clearfix setting">
			<ul class="about-us">
				<li>联系我们</li>
				<li>加入陆通</li>
			</ul>
			<ul class="language">
				<li>中文简体</li>
				<li>中文繁體</li>
				<li>ENGLISH</li>
			</ul>
		</div>
		<ul class="menu">
			<li class="action">首页</li>
			<li>关于陆通</li>
			<li>业务领域</li>
			<li>陆通律师</li>
			<li>新闻动态</li>
			<li>研究成果</li>
		</ul>
	</div>
</template>

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

		.menu {
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