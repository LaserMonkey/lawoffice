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
		<div class="z-margin-bottom z-padding-top">
			<label>口口口口：</label>
			<file-upload title="点击此处添加附件(可不上传)"></file-upload>
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
				uploadUrl: '/upload',
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
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=about&m=add_about&token=' + _self.$store.getters.token + '&lang=' + _self.lang + '&title=' + _self.aboutTitle + '&content=' + _self.outputContent,
				).then((response) => {
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
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=about&m=update_about&token=' + _self.$store.getters.token + '&lang=' + _self.lang + '&title=' + _self.aboutTitle + '&content=' + _self.outputContent + '&id=' + _self.aboutID,
				).then((response) => {
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
			}
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