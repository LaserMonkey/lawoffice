<template>
	<div class="lawyer z-min-width">
		<div class="z-margin-bottom lawyer-name">
			<label>口口口口：</label>
			<input placeholder="请输入姓名" v-model="lawyerName">
			<label>口口口口：</label>
			<select name="lawyerType" v-model="lawyerTypeID">
				<option value="1">首席及合伙人</option>
				<option value="2">律师</option>
			</select>
			<label>口口口口：</label>
			<select name="lawyerLang" v-model="lang">
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
			<button @click="saveLawyer()">口口</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Editor from 'tpl/manage/editor.vue'
	import FileUpload from 'vue-upload-component'

	export default {
		data: function() {
			return {
				lawyerSource: "",
				lawyerBrief: "",
				lawyerName: "",
				lawyerTypeList: [],
				lawyerTypeID: 1,
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
				
			})
		},
		methods: {
			saveLawyer: function() {
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
			}
		}
	}
</script>

<style lang="sass">
	.lawyer {
		margin-left: 200px;
		padding: 30px 40px;
		background-color: #fafafa;
		
		input {
			width: 200px;
			margin-right: 40px;
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