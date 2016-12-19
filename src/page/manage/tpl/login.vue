<template>
	<div class="login">
		<div class="login-area">
			<div class="login-input"><label>用户名：</label><input></div>
			<div class="login-input"><label>密码：</label><input></div>
		</div>
	</div>
</template>

<style lang="sass">
	.login {
		min-height: 300px;
		margin-left: 200px;
		padding-top: 100px;
		background-color: #fafafa;

		.login-area {
			width: 400px;
			margin: 0 auto;

			.login-input {
				margin-bottom: 20px;

				label {
					display: inline-block;
					width: 60px;
					margin-right: 20px;
					font-size: 1.4rem;
				}
			}
		}
	}
</style>