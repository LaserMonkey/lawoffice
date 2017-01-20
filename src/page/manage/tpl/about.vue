<template>
	<div class="about z-main-right">
		<div class="z-margin-bottom about-title">
			<label>标题：</label>
			<input placeholder="请输入标题" v-model="aboutTitle">
			<label>选择语言：</label>
			<select name="aboutLang" v-model="lang">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
		</div>
		<v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="outputContent"></v-editor>
		<ul class="z-upload" v-show="attachmentList.length >= 1">
			<li>已传附件：</li>
			<li v-for="(attachment, attachmentIndex) in attachmentList"><span>{{attachment.name}}</span><i class="z-icon-close" @click="delAttachment(attachmentIndex, attachment.id)">+</i></li>
		</ul>
		<div class="z-margin-bottom z-padding-top">
			<label>附件上传：</label>
			<file-upload title="点击此处添加附件(可不上传)" :post-action="uploadUrl" :events="events" :name="typeName" :accept="accept" :multiple="true" :size="1024 * 1024 * 10" ref="upload" :files="files"></file-upload>
			<label>上传进度：</label><span>{{uploadProgress}}</span>
		</div>
		<div class="z-margin-bottom z-padding-top">
			<button @click="saveAbout()">保存</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Editor from 'tpl/manage/editor.vue'
	import FileUpload from 'vue-upload-component'

	export default {
		data: function() {
			return {
				aboutID: 0,
				aboutTitle: "",
				lang: 1,
				inputContent: '',
				outputContent: '',
				uploadUrl: '/admin/index.php?c=article&m=upload_attachment&token=' + this.$store.getters.token,
				uploadUrlForEditor: '/admin/index.php?c=sys&m=update_img&token=' + this.$store.getters.token,
				attachmentList: [],
				addAttachmentList: [],
				delAttachmentList: [],
				events: {
					_self: this,
					add(file, component) {
						this._self.uploadProgress = "等待上传"
						if(file.size > (1024 * 1024 * 10)) {
							this._self.uploadProgress = "附件不能大于10M！"
							alert("附件不能大于10M！")
						}
						component.active = true;
						file.headers['X-Filename'] = encodeURIComponent(file.name)
						file.data.finename = file.name
					},
					before(file, component) {
					},
					progress(file, component) {
						this._self.uploadProgress = parseInt(file.progress) - 1 + '%'
					},
					after(file, component) {
						if(file.response.status == 1) {
							this._self.uploadProgress = "上传完毕"
							let attachment = {
								name: file.response.name,
								id: file.response.id
							}
							this._self.attachmentList.push(attachment)
							this._self.addAttachmentList.push(attachment.id)
						} else {
							alert("上传附件失败！")
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
			if(this.$route.query.aboutid != undefined) {
				this.aboutID = this.$route.query.aboutid
				this.loadAboutInfo()
			}
		},
		methods: {
			saveAbout: function() {
				if(this.aboutID == 0) {
					this.addAbout()
				} else {
					this.editAbout()
				}
			},
			addAbout: function() {
				let attachment = []
				if(this.attachmentList.length > 0) {
					for(let i = 0; i < this.attachmentList.length; i++) {
						attachment.push(this.attachmentList[i].id)
					}
				}
				const _self = this
				const options = {
					token: this.$store.getters.token,
					lang: this.lang,
					title: this.aboutTitle,
					content: this.outputContent,
					attachment: attachment.join(),
				}
				this.$http({
                		url: '/admin/index.php?c=about&m=add_about',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/aboutlist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/aboutlist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editAbout: function() {
				let attachment = []
				if(this.attachmentList.length > 0) {
					for(let i = 0; i < this.attachmentList.length; i++) {
						attachment.push(this.attachmentList[i].id)
					}
				}
				const _self = this
				const options = {
					token: this.$store.getters.token,
					lang: this.lang,
					title: this.aboutTitle,
					content: this.outputContent,
					id: this.aboutID,
					add_attachment: this.addAttachmentList.join(),
					del_attachment: this.delAttachmentList.join(),
				}
				this.$http({
                		url: '/admin/index.php?c=about&m=update_about',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/aboutlist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			loadAboutInfo: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=about&m=get_about_info&token=' + _self.$store.getters.token + '&id=' + _self.aboutID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.aboutTitle = data.info.title
    					_self.lang = data.info.lang
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
			delAttachment: function(attachmentIndex, attachmentID) {
				this.attachmentList.splice(attachmentIndex, 1)
				this.delAttachmentList.push(attachmentID)
			},
		}
	}
</script>

<style lang="sass">
	.about {
		padding: 30px 40px;
		
		input {
			width: 300px;
			margin-right: 40px;
		}

		.file-uploads {
			input {
				font-size: 0;
			}
		}
	}
</style>