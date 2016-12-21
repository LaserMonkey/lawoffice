<template>
	<div class="article">
		<div>
			<label>口口口口：</label>
			<select name="articleType" v-model="articleTypeID">
				<option v-for="(articleType, index) in articleTypeList" :value="articleType.id" :disabled="articleType.disable == 0 ? true : false">{{articleType.name1}}</option>
			</select>
			<label>口口口口：</label>
			<select name="articleLang" v-model="lang">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
		</div>
		<div class="z-margin-bottom article-title">
			<label>口口口口：</label>
			<input placeholder="请输入文章标题" v-model="articleTitle">
		</div>
		<div class="z-margin-bottom z-padding-top"><label>口口口口</label></div>
		<textarea placeholder="请在这里写下文章简介" v-model="articleBrief"></textarea>
		<div>
			<label>口口口口：</label>
			<input placeholder="请写信息来源" v-model="articleSource">
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				articleSource: "",
				articleBrief: "",
				articleTitle: "",
				articleTypeList: [],
				articleTypeID: '0',
				content: "",
				lang: 1,
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.init()
			})
		},
		methods: {
			init: function() {
				this.getArticleTypeList()
			},
			getArticleTypeList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_type_list&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.articleTypeList = data.list
    					_self.articleTypeID = data.list[0].id
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
		}
	}
</script>

<style lang="sass">
	.article {
		margin-left: 200px;
		padding: 30px 40px;
		background-color: #fafafa;
		
		input {
			width: 75%;
		}
	}
</style>