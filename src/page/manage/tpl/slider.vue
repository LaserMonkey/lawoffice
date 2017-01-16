<template>
	<div class="slider z-main-right">
		<div class="slider-type z-margin-bottom">
			<select name="sliderLang" v-model="lang" @change="getFresh()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
		</div>
		<ul>
			<li v-for="(slider, index) in sliderList">
				<div :style="'background-image:url(' + slider.img + ')'" @click="openPopSlider(index, slider.id)" class="sliderImg">
					<h3>{{slider.title}}</h3>
					<div class="z-del-btn" @click.stop="openPopDelSlider(slider.id)">+</div>
				</div>
				<div class="z-clearfix">
					<div :class="slider.disable == '0' ? 'z-blockup z-clearfix' : 'z-using z-clearfix'">
						<span class="able" @click="blockup(slider.id, slider.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(slider.id, slider.disable, index, 0)">禁用</span>
					</div>
					<span class="action-sort" @click="openPopSort(slider.id, slider.sort)">排序</span>
				</div>
			</li>
			<li class="add-btn" @click="openPopSlider(-1, 0)" v-show="sliderList.length < 8">+</li>
		</ul>
		<div class="z-pop pop-add-slider" v-show="showPopSlider">
			<div class="pop-blank">
				<label>选择语言：</label>
				<select name="popSliderLang" v-model="sliderLang">
					<option value="1">简体</option>
					<option value="2">繁體</option>
					<option value="3">ENGLISH</option>
				</select>
			</div>
			<div class="pop-blank">
				<label>标题名称：</label>
				<input type="text" placeholder="请输入标题名称" v-model="sliderTitle">
			</div>
			<div class="pop-blank">
				<label>链接地址：</label>
				<input type="text" placeholder="请输入链接地址" v-model="sliderLink">
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
				<button @click="addSlider()" v-show="showSliderAddBtn">确定</button>
				<button @click="editSlider()" v-show="showSliderEditBtn">确定</button>
				<button class="z-pop-cancel" @click="closePopSlider()">取消</button>
			</div>
		</div>
		<div class="z-pop z-pop-del" v-show="showPopDelSlider">
			<div class="pop-blank">
				确定要删除此项的操作？
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="delSlider()">确定</button>
				<button class="z-pop-cancel" @click="closePopDelSlider()">取消</button>
			</div>
		</div>
		<div class="z-pop z-pop-sort" v-show="showPopSortSlider">
			<div class="z-sort">
				<label>设置排序：</label>
				<input type="number" min="0" v-model="sliderSort">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="updateSort()">确定</button>
				<button class="z-pop-cancel" @click="closePopSortSlider()">取消</button>
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
				sliderList: [],
				lang: 1,
				showCover: false,
				sliderLang: 1,
				sliderTitle: "",
				sliderLink: "",
				showPopSlider: false,
				showSliderAddBtn: true,
				showSliderEditBtn: false,
				sliderID: 0,
				showPopDelSlider: false,
				sliderSort: 0,
				showPopSortSlider: false,
				uploadUrl: '/admin/index.php?c=sys&m=update_img&token=' + this.$store.getters.token,
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
				this.getSliderList()
			})
		},
		methods: {
			getSliderList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=get_carousel_list&token=' + _self.$store.getters.token + '&lang=' + _self.lang,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.sliderList = data.list
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
				this.getSliderList()
			},
			openPopSlider: function(index, sliderID) {
				this.sliderID = sliderID
				if(index == -1) {
					this.sliderLang = 1
					this.sliderTitle = ""
					this.sliderLink = ""
					this.imgUrl = ""
					this.showSliderEditBtn = false
					this.showSliderAddBtn = true
				} else {
					this.sliderLang = this.sliderList[index].lang
					this.sliderTitle = this.sliderList[index].title
					this.sliderLink = this.sliderList[index].url
					this.sliderSort = this.sliderList[index].sort
					this.imgUrl = this.sliderList[index].img
					this.showSliderAddBtn = false
					this.showSliderEditBtn = true
				}
				this.showCover = true
				this.showPopSlider = true
			},
			addSlider: function(index) {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=add_carousel&token=' + _self.$store.getters.token + '&lang=' + _self.sliderLang + '&title=' + _self.sliderTitle + '&url=' + _self.sliderLink + '&img=' + _self.imgUrl,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
						_self.closePopSlider()
    					_self.getSliderList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editSlider: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=update_carousel&token=' + _self.$store.getters.token + '&id=' + _self.sliderID + '&lang=' + _self.sliderLang + '&title=' + _self.sliderTitle + '&url=' + _self.sliderLink + '&img=' + _self.imgUrl,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
						_self.closePopSlider()
    					_self.getSliderList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopSlider: function() {
				this.showPopSlider = false
				this.showCover = false
			},
			openPopDelSlider: function(sliderID) {
				this.sliderID = sliderID
				this.showCover = true
				this.showPopDelSlider = true
			},
			delSlider: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=del_carousel&token=' + _self.$store.getters.token + '&id=' + _self.sliderID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getSliderList()
    					_self.closePopDelSlider()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopDelSlider: function() {
				this.showPopDelSlider = false
				this.showCover = false
			},
			blockup: function(sliderID, sliderDisable, index, action) {
				if(sliderDisable == action || (sliderDisable > '0' && action> '0')) {
					return
				}
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=disable_carousel&token=' + _self.$store.getters.token + '&id=' + sliderID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(sliderDisable == '0') {
    						sliderDisable = new Date().getTime()
    					} else {
    						sliderDisable = '0'
    					}
    					_self.sliderList[index].disable = sliderDisable
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopSort: function(sliderID, sliderSort) {
				this.sliderID = sliderID
				this.sliderSort = sliderSort
				this.showCover = true
				this.showPopSortSlider = true
			},
			updateSort: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=sort_carousel&token=' + _self.$store.getters.token + '&id=' + _self.sliderID + '&sort=' + _self.sliderSort,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getSliderList()
    					_self.closePopSortSlider()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopSortSlider: function() {
				this.showPopSortSlider = false
				this.showCover = false
			},
		},
	}
</script>

<style lang="sass">
	.slider {
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
				width: 40%;
				max-width: 200px;
				margin-right: 20px;
				margin-bottom: 20px;

				.sliderImg {
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

		.pop-add-slider {
			margin-top: -150px;
			margin-left: -230px;

			.pop-blank {
				margin-bottom: 10px;

				select {
					margin-bottom: 0;
				}
			}
		}
	}
</style>