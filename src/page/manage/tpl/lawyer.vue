<template>
	<div class="lawyer z-main-right">
		<div class="z-margin-bottom lawyer-name">
			<label>人员姓名：</label>
			<input placeholder="请输入姓名" v-model="lawyerName">
			<label>人员类型：</label>
			<select name="lawyerType" v-model="lawyerTypeID">
				<option value="1">首席及合伙人</option>
				<option value="2">律师</option>
			</select>
			<label>选择语言：</label>
			<select name="lawyerLang" v-model="lang">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
		</div>
		<v-editor :input-content="inputContent" :upload-url="uploadUrlForEditor" v-model="outputContent"></v-editor>
		<ul class="upload">
			<li v-show="imgUrl != ''">已传图片：{{imgUrl}}</li>
		</ul>
		<div class="z-margin-bottom z-padding-top">
			<label>图片上传：</label>
			<file-upload title="点击此处添加附件(可不上传)" :post-action="uploadUrl" :events="events" :name="typeName" :accept="accept" :multiple="false" :size="1024 * 1024 * 10" ref="upload" :files="files"></file-upload>
			<label>上传进度：</label><span>{{uploadProgress}}</span>
		</div>
		<ul>
			<li v-for="(file, index) in files">{{file.name}}</li>
		</ul>
		<div class="z-margin-bottom z-padding-top">
			<button @click="saveLawyer()">保存</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Editor from 'tpl/manage/editor.vue'
	import FileUpload from 'vue-upload-component'

	export default {
		data: function() {
			return {
				lawyerID: 0,
				lawyerSource: "",
				lawyerBrief: "",
				lawyerName: "",
				lawyerTypeList: [],
				lawyerTypeID: 1,
				lang: 1,
				inputContent: '',
				outputContent: '',
				uploadUrl: '/admin/index.php?c=sys&m=update_img&type=1&token=' + this.$store.getters.token,
				uploadUrlForEditor: '/admin/index.php?c=sys&m=update_img&token=' + this.$store.getters.token,
				events: {
					_self: this,
					add(file, component) {
						component.active = true;
						file.headers['X-Filename'] = encodeURIComponent(file.name)
						file.data.finename = file.name
					},
					before(file, component) {
						this._self.uploadProgress = "等待上传"
					},
					progress(file, component) {
						this._self.uploadProgress = parseInt(file.progress) - 1 + '%'
					},
					after(file, component) {
						if(file.response.status == 1) {
							this._self.uploadProgress = "上传完毕"
							this._self.imgUrl = file.response.img
						} else {
							alert("上传图片失败！")
						}
					},
				},
				typeName: "img",
				accept: 'image/*',
				files: [],
				uploadFile: [],
				imgUrl: "",
				uploadProgress: "等待上传",
			}
		},
		components: {
			'v-editor': Editor,
			FileUpload
		},
		mounted: function () {
			if(this.$route.query.lawyerid != undefined) {
				this.lawyerID = this.$route.query.lawyerid
				this.loadLawyerInfo()
			}
		},
		methods: {
			saveLawyer: function() {
				if(this.lawyerID == 0) {
					this.addLawyer()
				} else {
					this.editLawyer()
				}
			},
			addLawyer: function() {
				const _self = this
				const options = {
					token: this.$store.getters.token,
					type: this.lawyerTypeID,
					lang: this.lang,
					name: this.lawyerName,
					content: this.outputContent,
					img: this.imgUrl
				}
				this.$http({
                		url: '/admin/index.php?c=lawyers&m=add_lawyers',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/lawyerlist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editLawyer: function() {
				const _self = this
				const options = {
					token: this.$store.getters.token,
					type: this.lawyerTypeID,
					lang: this.lang,
					name: this.lawyerName,
					content: this.outputContent,
					img: this.imgUrl,
					id: this.lawyerID,
					img: this.imgUrl
				}
				this.$http({
                		url: '/admin/index.php?c=lawyers&m=update_about',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/lawyerlist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			loadLawyerInfo: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=lawyers&m=get_lawyers_info&token=' + _self.$store.getters.token + '&id=' + _self.lawyerID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.lawyerName = data.info.name
    					_self.lawyerTypeID = data.info.type
    					_self.lang = data.info.lang
    					_self.inputContent = data.info.content
    					_self.outputContent = data.info.content
    					_self.imgUrl = data.info.img
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
	.lawyer {
		padding: 30px 40px;
		
		input {
			width: 200px;
			margin-right: 40px;
		}

		.file-uploads {
			input {
				font-size: 0;
			}
		}

		.upload {
			font-size: 1.4rem;
		}
	}
</style>