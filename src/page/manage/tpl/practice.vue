<template>
	<div class="practice z-main-right">
		<div class="z-margin-bottom practice-title">
			<label>业务名称：</label>
			<input placeholder="请输入业务领域名称" v-model="practiceTitle">
			<label>业务类型：</label>
			<select name="practiceType" v-model="practiceTypeID">
				<option v-for="(practiceType, index) in practiceTypeList" :value="practiceType.id" :disabled="practiceType.disable == 0 ? true : false">{{practiceType.name1}}</option>
			</select>
			<label>选择语言：</label>
			<select name="practiceLang" v-model="lang">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
		</div>
		<v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="outputContent"></v-editor>
		<div class="z-margin-bottom z-padding-top">
			<button @click="savePractice()">保存</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Editor from 'tpl/manage/editor.vue'

	export default {
		data: function() {
			return {
				practiceID: 0,
				practiceSource: "",
				practiceTitle: "",
				practiceTypeList: [],
				practiceTypeID: 1,
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
			'v-editor': Editor
		},
		mounted: function () {
			this.getPracticeTypeList()
			if(this.$route.query.practiceid != undefined) {
				this.practiceID = this.$route.query.practiceid
				this.loadPracticeInfo()
			}
		},
		methods: {
			getPracticeTypeList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=get_practices_type_list&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.practiceTypeList = data.list
    					_self.practiceTypeID = data.list[0].id
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			savePractice: function() {
				if(this.practiceID == 0) {
					this.addPractice()
				} else {
					this.editPractice()
				}
			},
			addPractice: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=add_practices&token=' + _self.$store.getters.token + '&type=' + _self.practiceTypeID + '&lang=' + _self.lang + '&title=' + _self.practiceTitle + '&content=' + _self.outputContent,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/practicelist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editPractice: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=update_practices&token=' + _self.$store.getters.token + '&type=' + _self.practiceTypeID + '&lang=' + _self.lang + '&title=' + _self.practiceTitle + '&content=' + _self.outputContent + '&id=' + _self.practiceID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.$router.push('/practicelist')
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			loadPracticeInfo: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=get_practices_info&token=' + _self.$store.getters.token + '&id=' + _self.practiceID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.practiceTitle = data.info.title
    					_self.practiceTypeID = data.info.type
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
	.practice {
		padding: 30px 40px;
		
		input {
			width: 260px;
			margin-right: 40px;
		}

		.file-uploads {
			input {
				font-size: 0;
			}
		}
	}
</style>