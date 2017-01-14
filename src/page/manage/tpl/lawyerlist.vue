<template>
	<div class="lawyerlist z-main-right">
		<div class="lawyer-type">
			<label>律师类型：</label>
			<select name="lawyerType" v-model="lawyerTypeID" @change="getLawyerList()">
				<option value="1">首席及合伙人</option>
				<option value="2">律师</option>
			</select>
			<label>语言：</label>
			<select name="lawyerLang" v-model="lang" @change="getLawyerList()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按人名模糊查询" v-model="search" @keyup.enter="getLawyerList()">
		</div>
		<div class="add-lawyer">
			<button @click="$router.push('/lawyer')">新建律师</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="lawyer-title">姓名</h3>
				<div>律师类型</div>
				<time>最后操作时间</time>
				<div class="options">操作</div>
			</li>
			<li v-for="(lawyer, index) in lawyerList">
				<h3 class="lawyer-title">{{lawyer.name}}</h3>
				<div>{{lawyer.type_name}}</div>
				<time :datetime="lawyer.dateline | dateFormat('yyyy年MM月dd日')">{{lawyer.dateline | dateFormat('yyyy年MM月dd日')}}</time>
				<div class="options">
					<div :class="lawyer.disable == '0' ? 'z-blockup-li z-clearfix' : 'z-using-li z-clearfix'">
						<span class="able" @click="blockup(lawyer.id, lawyer.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(lawyer.id, lawyer.disable, index, 0)">禁用</span>
					</div>
					<router-link :to="{name: 'lawyer', query: {lawyerid: lawyer.id}}">编辑</router-link>
					<span @click="openPopDel(lawyer.id)">删除</span>
				</div>
			</li>
		</ul>
		<div class="z-page-ctrl z-clearfix">
			<div class="z-page-prev" @click="goPage(pageNow-1)" v-show="pageNow != 1">上一页</div>
			<div class="z-page-num" v-for="pageBtn in pageBtnList" :class="pageBtn == pageNow ? 'action' : ''" @click="goPage(pageBtn)">{{pageBtn}}</div>
			<div class="z-page-next" @click="goPage(pageNow+1)" v-show="pageNow != pageCount">下一页</div>
			<div class="z-page-jump"><label>跳转到第</label><input type="number" min="1" :max="pageCount" v-model="pageInput" @keyup.enter="goPage(pageInput)"><label>页，共{{pageCount}}页</label></div>
		</div>
		<div class="z-pop z-pop-del" v-show="showPopDel">
			<div class="pop-blank">
				确定要删除此项的操作？
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="del()">确定</button>
				<button class="z-pop-cancel" @click="closePopDel()">取消</button>
			</div>
		</div>
		<div class="z-cover" v-show="showCover"></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				lawyerList: [],
				lawyerTypeList: [],
				lawyerTypeID: 1,
				lang: 1,
				search: "",
				showPopDel: false,
				showCover: false,
				pageCount: 1,
				pageNow: 1,
				perpage: 10,
				pageInput: 1,
				pagePrev: false,
				pageNext: false,
				totals: 2,
				pageBtnList: [],
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getLawyerList()
			})
		},
		methods: {
			getLawyerList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=lawyers&m=get_lawyers_list&page=' + _self.pageNow + '&name=' + _self.search + '&type=' + _self.lawyerTypeID + '&lang=' + _self.lang + '&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.lawyerList = data.list
    					_self.pageCount = data.pages
    					_self.pageNow = data.page
    					_self.totals = data.totals
    					_self.getPageBtnList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			blockup: function(lawyerID, lawyerDisable, index, action) {
				if(lawyerDisable == action || (lawyerDisable > '0' && action> '0')) {
					return
				}
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=lawyers&m=disable_lawyers&token=' + _self.$store.getters.token + '&id=' + lawyerID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(lawyerDisable == '0') {
    						lawyerDisable = new Date().getTime()
    					} else {
    						lawyerDisable = '0'
    					}
    					_self.lawyerList[index].disable = lawyerDisable
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopDel: function(lawyerID) {
				this.lawyerID = lawyerID
				this.showCover = true
				this.showPopDel = true
			},
			del: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=lawyers&m=del_lawyers&token=' + _self.$store.getters.token + '&id=' + _self.lawyerID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getLawyerList()
    					_self.closePopDel()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopDel: function() {
				this.showPopDel = false
				this.showCover = false
			},
			goPage: function(pageNow) {
				if(pageNow >= 1 && pageNow <= this.pageCount && pageNow != this.pageNow) {
					this.pageNow = pageNow
					this.getLawyerList()
				}
			},
			getPageBtnList: function() {
				this.pageBtnList = []
				if(this.pageNow >= this.pageCount-2) {
					if(this.pageCount <= 5) {
						for(let i = 1; i <= this.pageCount; i++) {
							this.pageBtnList.push(i)
						}
					} else {
						for(let i = this.pageCount-4; i <= this.pageCount; i++) {
							this.pageBtnList.push(i)
						}
					}
				} else if(this.pageNow < this.pageCount-2) {
					if(this.pageCount <= 5) {
						for(let i = 1; i <= this.pageCount; i++) {
							this.pageBtnList.push(i)
						}
					} else if(this.pageCount > 5 && this.pageNow <= 3) {
						for(let i = 1; i <= 5; i++) {
							this.pageBtnList.push(i)
						}
					} else {
						for(let i = this.pageNow-2; i <= this.pageNow+2; i++) {
							this.pageBtnList.push(i)
						}
					}
				}
			}
		},
		filters: {
			dateFormat: function(value, fmt) {
				let date = new Date(value * 1000)
				let o = {
					"M+": date.getMonth() + 1, //月份 
					"d+": date.getDate(), //日 
					"h+": date.getHours(), //小时 
					"m+": date.getMinutes(), //分 
					"s+": date.getSeconds(), //秒 
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
					"S": date.getMilliseconds() //毫秒 
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (let k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt
			}
		},
	}
</script>

<style lang="sass">
	.lawyerlist {
		padding-bottom: 20px;
		
		.lawyer-type {
			padding: 30px 40px 20px;
		}
		
		.add-lawyer {
			padding: 0 20px 15px;
		}

		.z-table {

			li {

				h3 {
					width: 15%;
				}

				div {
					width: 25%;
				}

				time {
					width: 25%;
				}

				.options {
					width: 35%;
				}
			}
		}
	}
</style>