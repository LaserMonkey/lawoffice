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
		<v-editor :input-content="inputContent" :upload-url="uploadUrlForEditor" v-model="outputContent"></v-editor>
		<div class="z-margin-bottom">
			<label>文章来源：</label>
			<input placeholder="请写信息来源" v-model="articleSource">
		</div>
		<ul class="upload" v-show="attachmentList.length >= 1">
			<li v-for="attachment in attachmentList">已传图片：{{attachment.url}}</li>
		</ul>
		<div class="z-margin-bottom z-padding-top">
			<label>图片上传：</label>
			<file-upload title="点击此处添加附件(可不上传)" :post-action="uploadUrl" :events="events" :name="typeName" :accept="accept" :multiple="true" :size="1024 * 1024 * 10" ref="upload" :files="files"></file-upload>
			<label>上传进度：</label><span>{{uploadProgress}}</span>
		</div>
		<ul>
			<li v-for="(file, index) in files">{{file.name}}</li>
		</ul>
		<div class="z-margin-bottom z-padding-top">
			<button @click="saveArticle()">保存</button>
		</div>
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
				inputContent: '',
				outputContent: '',
				uploadUrl: '/admin/index.php?c=article&m=upload_attachment&token=' + this.$store.getters.token,
				uploadUrlForEditor: '/admin/index.php?c=sys&m=update_img&token=' + this.$store.getters.token,
				attachmentList: [],
				attachment: [],
				events: {
					_self: this,
					add(file, component) {
						console.log(file)
						console.log(component)
						component.active = true;
						file.headers['X-Filename'] = encodeURIComponent(file.name)
						file.data.finename = file.name
					},
					before(file, component) {
						this._self.uploadProgress = "等待上传"
						this._self.attachmentList = []
					},
					progress(file, component) {
						this._self.uploadProgress = parseInt(file.progress) - 1 + '%'
					},
					after(file, component) {
						if(file.response.status == 1) {
							this._self.uploadProgress = "上传完毕"
							this._self.attachment.push(file.response.id)
						} else {
							alert("上传图片失败！")
						}
					},
				},
				typeName: "attachment",
				accept: '*',
				files: [],
				uploadFile: [],
				uploadProgress: "等待上传",
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
				const options = {
					token: this.$store.getters.token,
					type: this.articleTypeID,
					lang: this.lang,
					title: this.articleTitle,
					intro: this.articleBrief,
					content: this.outputContent,
					source: this.articleSource,
					attachment: this.attachment.join(),
				}
				this.$http({
                		url: '/admin/index.php?c=article&m=add_article',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
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
				const options = {
					token: this.$store.getters.token,
					type: this.articleTypeID,
					lang: this.lang,
					title: this.articleTitle,
					intro: this.articleBrief,
					content: this.outputContent,
					source: this.articleSource,
					attachment: this.attachment.join(),
					id: this.articleID,
				}
				this.$http({
                		url: '/admin/index.php?c=article&m=update_article',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
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
    					_self.attachmentList = data.attachment
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
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
	}
</style>