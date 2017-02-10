<template>
	<div class="hot z-main-right">
		<ul>
			<li v-for="(hot, index) in hotList">
				<div :style="'background-image:url(' + hot.img + ')'" @click="openPopHot(index, hot.id)" class="hotImg">
					<h3>{{hot.title}}</h3>
					<div class="z-del-btn" @click.stop="openPopDelHot(hot.id)">+</div>
				</div>
				<div class="z-clearfix">
					<div :class="hot.disable == '0' ? 'z-blockup z-clearfix' : 'z-using z-clearfix'">
						<span class="able" @click="blockup(hot.id, hot.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(hot.id, hot.disable, index, 0)">禁用</span>
					</div>
					<span class="action-sort" @click="openPopSortHot(hot.id, hot.sort)">排序</span>
				</div>
			</li>
			<li class="add-btn" @click="openPopHot(-1, 0)" v-show="hotList.length < 8">+</li>
		</ul>
		<div class="z-pop pop-add-hot" v-show="showPopHot">
			<div class="pop-blank">
				<label>简体标签：</label>
				<input type="text" placeholder="建议四字左右" v-model="hotTitle1">
			</div>
			<div class="pop-blank">
				<label>简体简述：</label>
				<input type="text" placeholder="简体简短标题" v-model="hotDescribe1">
			</div>
			<div class="pop-blank">
				<label>简体链接：</label>
				<input type="text" placeholder="请输入简体文章链接地址" v-model="hotLink1">
			</div>
			<div class="pop-blank">
				<label>繁体标签：</label>
				<input type="text" placeholder="建议四字左右" v-model="hotTitle2">
			</div>
			<div class="pop-blank">
				<label>繁体简述：</label>
				<input type="text" placeholder="繁体简短标题" v-model="hotDescribe2">
			</div>
			<div class="pop-blank">
				<label>繁体链接：</label>
				<input type="text" placeholder="请输入繁体文章链接地址" v-model="hotLink2">
			</div>
			<div class="pop-blank">
				<label>英文标签：</label>
				<input type="text" placeholder="英文标签" v-model="hotTitle3">
			</div>
			<div class="pop-blank">
				<label>英文简述：</label>
				<input type="text" placeholder="英文简短标题" v-model="hotDescribe3">
			</div>
			<div class="pop-blank">
				<label>英文链接：</label>
				<input type="text" placeholder="请输入英文文章链接地址" v-model="hotLink3">
			</div>
			<ul class="upload">
				<li v-show="imgUrl != ''">已传图片：{{imgUrl}}</li>
			</ul>
			<div class="z-margin-bottom z-padding-top">
				<label>背景图片：</label>
				<file-upload title="点击此处添加附件(可不上传)" :post-action="uploadUrl" :events="events" :name="typeName" :accept="accept" :multiple="false" :size="1024 * 1024 * 10" ref="upload" :files="files"></file-upload>
				<label>上传进度：</label><span>{{uploadProgress}}</span>
			</div>
			<ul>
				<li v-for="(file, index) in files">{{file.name}}</li>
			</ul>
			<div class="z-pop-action z-clearfix">
				<button @click="addHot()" v-show="showHotAddBtn">确定</button>
				<button @click="editHot()" v-show="showHotEditBtn">确定</button>
				<button class="z-pop-cancel" @click="closePopHot()">取消</button>
			</div>
		</div>
		<div class="z-pop pop-del-hot" v-show="showPopDelHot">
			<div class="pop-blank">
				确定要删除此项的操作？
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="delHot()">确定</button>
				<button class="z-pop-cancel" @click="closePopDelHot()">取消</button>
			</div>
		</div>
		<div class="z-pop pop-sort-hot" v-show="showPopSortHot">
			<div class="z-sort">
				<label>设置排序：</label>
				<input type="number" min="0" v-model="hotSort">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="updateSort()">确定</button>
				<button class="z-pop-cancel" @click="closePopSortHot()">取消</button>
			</div>
		</div>
		<div class="z-cover" v-show="showCover"></div>
	</div>
</template>

<script type="text/javascript">
	import FileUpload from 'vue-upload-component'
	export default {
		data: function() {
			return {
				hotList: [],
				showCover: false,
				hotTitle1: "",
				hotLink1: "",
				hotDescribe1: "",
				hotTitle2: "",
				hotLink2: "",
				hotDescribe2: "",
				hotTitle3: "",
				hotLink3: "",
				hotDescribe3: "",
				showPopHot: false,
				showHotAddBtn: true,
				showHotEditBtn: false,
				hotID: 0,
				showPopDelHot: false,
				hotSort: 0,
				showPopSortHot: false,
				uploadUrl: '/admin/index.php?c=sys&m=update_img&type=3&token=' + this.$store.getters.token,
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
			FileUpload
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getHotList()
			})
		},
		methods: {
			getHotList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=get_custom_list&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.hotList = data.list
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			getFresh: function() {
				this.getHotList()
			},
			openPopHot: function(index, hotID) {
				this.hotID = hotID
				if(index == -1) {
					this.hotTitle1 = ""
					this.hotLink1 = ""
					this.hotDescribe1 = ""
					this.hotTitle2 = ""
					this.hotLink2 = ""
					this.hotDescribe2 = ""
					this.hotTitle3 = ""
					this.hotLink3 = ""
					this.hotDescribe3 = ""
					this.imgUrl = ""
					this.showHotEditBtn = false
					this.showHotAddBtn = true
				} else {
					this.hotTitle1 = this.hotList[index].title1
					this.hotLink1 = this.hotList[index].url1
					this.hotDescribe1 = this.hotList[index].describe1
					this.hotTitle2 = this.hotList[index].title2
					this.hotLink2 = this.hotList[index].url2
					this.hotDescribe2 = this.hotList[index].describe2
					this.hotTitle3 = this.hotList[index].title3
					this.hotLink3 = this.hotList[index].url3
					this.hotDescribe3 = this.hotList[index].describe3
					this.hotSort = this.hotList[index].sort
					this.imgUrl = this.hotList[index].img
					this.showHotAddBtn = false
					this.showHotEditBtn = true
				}
				this.showCover = true
				this.showPopHot = true
			},
			addHot: function(index) {
				const _self = this
				const options = {
					token: this.$store.getters.token,
					title1: this.hotTitle1,
					url1: this.hotLink1,
					describe1: this.hotDescribe1,
					title2: this.hotTitle2,
					url2: this.hotLink2,
					describe2: this.hotDescribe2,
					title3: this.hotTitle3,
					url3: this.hotLink3,
					describe3: this.hotDescribe3,
					img: this.imgUrl,
				}
				this.$http({
                		url: '/admin/index.php?c=sys&m=add_custom_info',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
						_self.closePopHot()
    					_self.getHotList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editHot: function() {
				const _self = this
				const options = {
					token: this.$store.getters.token,
					id: this.hotID,
					title1: this.hotTitle1,
					url1: this.hotLink1,
					describe1: this.hotDescribe1,
					title2: this.hotTitle2,
					url2: this.hotLink2,
					describe2: this.hotDescribe2,
					title3: this.hotTitle3,
					url3: this.hotLink3,
					describe3: this.hotDescribe3,
					img: this.imgUrl,
				}
				this.$http({
                		url: '/admin/index.php?c=sys&m=update_custom_info',
						method: 'POST',
						body: options,
						emulateJSON:true
					}).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
						_self.closePopHot()
    					_self.getHotList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopHot: function() {
				this.showPopHot = false
				this.showCover = false
			},
			openPopDelHot: function(hotID) {
				this.hotID = hotID
				this.showCover = true
				this.showPopDelHot = true
			},
			delHot: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=del_custom_info&token=' + _self.$store.getters.token + '&id=' + _self.hotID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getHotList()
    					_self.closePopDelHot()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopDelHot: function() {
				this.showPopDelHot = false
				this.showCover = false
			},
			blockup: function(hotID, hotDisable, index, action) {
				if(hotDisable == action || (hotDisable > '0' && action> '0')) {
					return
				}
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=disable_custom_info&token=' + _self.$store.getters.token + '&id=' + hotID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(hotDisable == '0') {
    						hotDisable = new Date().getTime()
    					} else {
    						hotDisable = '0'
    					}
    					_self.hotList[index].disable = hotDisable
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopSortHot: function(hotID, hotSort) {
				this.hotID = hotID
				this.hotSort = hotSort
				this.showCover = true
				this.showPopSortHot = true
			},
			updateSort: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=sort_custom_info&token=' + _self.$store.getters.token + '&id=' + _self.hotID + '&sort=' + _self.hotSort,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getHotList()
    					_self.closePopSortHot()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopSortHot: function() {
				this.showPopSortHot = false
				this.showCover = false
			},
		},
	}
</script>

<style lang="sass">
	.hot {
		padding: 30px 40px;

		h2 {
			margin-bottom: 10px;
			font-size: 2.0rem
		}

		ul {
			display: flex;
			margin-bottom: 20px;
			flex-wrap: wrap;
			align-items: flex-start;
			align-content: flex-start;
			
			li {
				width: 20%;
				max-width: 200px;
				margin-right: 20px;
				margin-bottom: 20px;

				.hotImg {
					position: relative;
					height: 120px;
					margin-bottom: 10px;
					background-position: center center;
					background-repeat: no-repeat;
					background-size: cover;
					background-color: rgb(220, 220, 220);
					cursor: pointer;

					&:hover {
						.z-del-btn {
							display: block;
						}
					}

					h3 {
						position: absolute;
						bottom: 0;
						color: white;
					}
				}

				.action-sort {
					line-height: 26px;
					color: #df001f;
					cursor: pointer;
				}
			}

			.add-btn {
				font-size: 6rem;
				text-align: center;
				line-height: 120px;
				color: rgb(220, 220, 220);
				background-color: rgb(240, 240, 240);
				cursor: pointer;
			}
		}

		.pop-add-hot {
			margin-top: -350px;
			margin-left: -230px;

			.pop-blank {
				margin-bottom: 10px;

				select {
					margin-bottom: 0;
				}
			}
		}

		.pop-del-hot {
			margin-top: -75px;
			margin-left: -180px;

			.pop-blank {
				margin-bottom: 10px;

				select {
					margin-bottom: 0;
				}
			}
		}

		.pop-sort-hot {
			margin-top: -82px;
			margin-left: -180px;
		}
	}
</style>