<template>
	<div class="article">
		<div class="article-type">
			<label>口口口口：</label>
			<select name="">
				<option value="">口口口口</option>
				<option value="">口口口口</option>
			</select>
			<button>口口口口</button>
		</div>
		<ul>
			<li class="article-list-frist">
				<h3 class="article-title">口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
			<li>
				<h3 class="article-title">口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
			<li>
				<h3 class="article-title">口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
		</ul>
		<div>
			
		</div>
	</div>
</template>

<style lang="sass">
	.article {
		margin-left: 200px;
		background-color: #fafafa;
		
		.article-type {
			padding: 30px 40px;

			label {
				margin-right: 10px;
				font-size: 1.4rem;
			}

			select {
				min-width: 180px;
				height: 40px;
				margin-right: 40px;
				padding-left: 15px;
				padding-right: 6.5%;
				border: solid 1px rgba(13, 5, 9, 0.1);
				font-size: 1.4rem;
				appearance:none;
				-moz-appearance:none;
				-webkit-appearance:none;
				background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
				background-position: 92%;
				background-color: white;

				&:-ms-expand {
					display: none;
				}

				option {
					height: 40px;
				}
			}
		}

		ul {
			padding-bottom: 20px;
			border-top: solid 1px rgba(0, 0, 0, 0.1);

			li {
				display: flex;
				padding: 16px 40px;
				border-bottom: solid 1px rgba(0, 0, 0, 0.1);
				font-size: 1.4rem;
				background-color: white;
				flex-wrap: wrap;
				align-items: flex-start;
				align-content: flex-start;

				h3 {
					width: 40%;
					font-size: 1.4rem;
					font-weight: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				div {
					width: 20%;
				}

				time {
					display: block;
					width: 20%;
				}

			}

			.article-list-frist {
				color: rgba(0, 0, 0, 0.6);
				background-color: #fffef7;

				button {

				}
			}
		}
	}
</style>