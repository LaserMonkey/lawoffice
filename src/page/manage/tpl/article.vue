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
		<v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="outputContent"></v-editor>
		<div class="z-margin-bottom">
			<label>口口口口：</label>
			<input placeholder="请写信息来源" v-model="articleSource">
		</div>
		<div class="z-margin-bottom z-padding-top">
			<label>口口口口：</label>
			<file-upload title="点击此处添加附件(可不上传)"></file-upload>
		</div>
		<div class="z-margin-bottom z-padding-top">
			<button @click="saveArticle()">口口</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Editor from 'tpl/manage/editor.vue'
	import FileUpload from 'vue-upload-component'

	export default {
		data: function() {
			return {
				articleSource: "",
				articleBrief: "",
				articleTitle: "",
				articleTypeList: [],
				articleTypeID: '0',
				lang: 1,
				// input content to editor
				inputContent: '',
				// output content from editor
				outputContent: '',
				// set image upload api url
				uploadUrl: '/api/v1/help/upload/wangEditorH5File'
			}
		},
		components: {
			'v-editor': Editor,
			FileUpload
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
			saveArticle: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=add_article&token=' + _self.$store.getters.token + '&type=' + _self.articleTypeID + '&lang=' + _self.lang + '&title=' + _self.articleTitle + '&intro=' + _self.articleBrief + '&content=' + _self.outputContent + '&source=' + _self.articleSource,
				).then((response) => {
					console.log(response)
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					console.log(data)
    					// _self.$router.push('/articlelist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
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
	.article {
		margin-left: 200px;
		padding: 30px 40px;
		background-color: #fafafa;
		
		input {
			width: 75%;
		}

		.wangEditor-container {
			margin-bottom: 20px;

			.wangEditor-menu-container {
				height: 62px;
			}
		}

		.file-uploads {
			input {
				font-size: 0;
			}
		}
	}
</style>