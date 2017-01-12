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
		<v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="outputContent"></v-editor>
		<div class="z-margin-bottom z-padding-top">
			<label>图片上传：</label>
			<file-upload title="点击此处添加附件(可不上传)" post-action="./upload" :events="events" :name="name" :accept="accept" :multiple="false" :size="1024 * 1024 * 10" ref="upload" :files="files"></file-upload>
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
				uploadUrl: '/upload',

				events: {
					add(file, component) {
						console.log('add')
						console.log(component)
						console.log(component.active)
						component.active = true;
						console.log(file)
						file.headers['X-Filename'] = encodeURIComponent(file.name)
						file.data.finename = file.name
						// file.putAction = 'xxx'
						// file.postAction = 'xxx'
					},
					progress(file, component) {
						console.log('progress ' + file.progress);
					},
					after(file, component) {
						console.log('after');
					},
					before(file, component) {
						console.log('before');
					},
				},
				name: "name",
				accept: 'image/*',
				files: [],
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
				this.$http.get('http://www.lutong.com/admin/index.php?c=lawyers&m=add_lawyers&token=' + _self.$store.getters.token + '&type=' + _self.lawyerTypeID + '&lang=' + _self.lang + '&name=' + _self.lawyerName + '&content=' + _self.outputContent,
				).then((response) => {
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
				this.$http.get('http://www.lutong.com/admin/index.php?c=lawyers&m=update_about&token=' + _self.$store.getters.token + '&type=' + _self.lawyerTypeID + '&lang=' + _self.lang + '&name=' + _self.lawyerName + '&content=' + _self.outputContent + '&id=' + _self.lawyerID,
				).then((response) => {
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
	}
</style>