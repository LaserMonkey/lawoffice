<template>
	<div class="article z-main-right">
		<div>
			<label>文章类型：</label>
			<select name="articleType" v-model="articleTypeID">
				<option v-for="(articleType, index) in articleTypeList" :value="articleType.id" :disabled="articleType.disable == 0 ? true : false">{{articleType.name1}}</option>
			</select>
			<label>文章语言：</label>
			<select name="articleLang" v-model="lang">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
		</div>
		<div class="z-margin-bottom article-title">
			<label>文章标题：</label>
			<input placeholder="请输入文章标题" v-model="articleTitle">
		</div>
		<div class="z-margin-bottom z-padding-top"><label>文章简要</label></div>
		<textarea placeholder="请在这里写下文章简介" v-model="articleBrief"></textarea>
		<v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="outputContent"></v-editor>
		<div class="z-margin-bottom">
			<label>文章来源：</label>
			<input placeholder="请写信息来源" v-model="articleSource">
		</div>
		<div class="z-margin-bottom">
			<label>关联律师：</label>
			<span class="select-btn" @click="openLawyerPop()">选择</span>
		</div>
		<div class="z-margin-bottom z-padding-top">
			<label>文件上传：</label>
			<file-upload title="点击此处添加附件(可不上传)"></file-upload>
		</div>
		<div class="z-margin-bottom z-padding-top">
			<button @click="saveArticle()">保存</button>
		</div>
		<div class="z-pop pop-lawyer" v-show="showPopLawyer">
			<div class="pop-blank">
				请选择要关联的律师
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="linkLawyer()">确定</button>
				<button class="z-pop-cancel" @click="closePopLawyer()">取消</button>
			</div>
		</div>
		<div class="z-cover" v-show="showCover"></div>
	</div>
</template>

<script type="text/javascript">
	import Editor from 'tpl/manage/editor.vue'
	import FileUpload from 'vue-upload-component'

	export default {
		data: function() {
			return {
				articleID: 0,
				articleSource: "",
				articleBrief: "",
				articleTitle: "",
				articleTypeList: [],
				articleTypeID: '0',
				lang: 1,
				showPopLawyer: false,
				showCover: false,
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
			this.getArticleTypeList()
			if(this.$route.query.articleid != undefined) {
				this.articleID = this.$route.query.articleid
				this.loadArticleInfo()
			}
		},
		methods: {
			getArticleTypeList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_type_list&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.articleTypeList = data.list
    					_self.articleTypeID = data.list[0].id
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			saveArticle: function() {
				if(this.articleID == 0) {
					this.addArticle()
				} else {
					this.editArticle()
				}
			},
			addArticle: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=add_article&token=' + _self.$store.getters.token + '&type=' + _self.articleTypeID + '&lang=' + _self.lang + '&title=' + _self.articleTitle + '&intro=' + _self.articleBrief + '&content=' + _self.outputContent + '&source=' + _self.articleSource,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/articlelist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editArticle: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=update_article&token=' + _self.$store.getters.token + '&type=' + _self.articleTypeID + '&lang=' + _self.lang + '&title=' + _self.articleTitle + '&intro=' + _self.articleBrief + '&content=' + _self.outputContent + '&source=' + _self.articleSource + '&id=' + _self.articleID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/articlelist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			loadArticleInfo: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_info&token=' + _self.$store.getters.token + '&id=' + _self.articleID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.articleTitle = data.info.title
    					_self.articleTypeID = data.info.type
    					_self.lang = data.info.lang
    					_self.articleBrief = data.info.intro
    					_self.articleSource = data.info.source
    					_self.inputContent = data.info.content
    					_self.outputContent = data.info.content
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openLawyerPop: function() {
				this.showPopLawyer = true
				this.showCover = true
				this.loadLawyer()
			},
			loadLawyer: function() {

			},
			closePopLawyer: function() {
				this.showPopLawyer = false
				this.showCover = false
			},
		}
	}
</script>

<style lang="sass">
	.article {
		padding: 30px 40px;
		
		input {
			width: 75%;
		}
		
		.file-uploads {
			input {
				font-size: 0;
			}

			span {
				font-size: 1.4rem;
				color: #1BA1FF;
				cursor: pointer;
			}
		}

		.select-btn {
			font-size: 1.4rem;
			color: #1BA1FF;
			cursor: pointer;
		}

		.pop-lawyer {
			margin-top: -165px;
			margin-left: -200px;

			input, select {
				width: 200px;
				margin-right: 0;
			}

			.pop-blank {
				margin-bottom: 10px;
			}
		}
	}
</style>