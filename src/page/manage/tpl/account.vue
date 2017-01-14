<template>
	<div class="accountlist z-main-right">
		<div class="add-account">
			<button @click="openPopAccount()">新建账户</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="account-title">用户名</h3>
				<div>新增时间</div>
				<time>最后登录时间</time>
				<div class="options">操作</div>
			</li>
			<li v-for="(account, index) in accountList">
				<h3 class="account-title">{{account.username}}</h3>
				<time :datetime="account.jointime | dateFormat('yyyy年MM月dd日')">{{account.jointime | dateFormat('yyyy年MM月dd日')}}</time>
				<time :datetime="account.logintime | dateFormat('yyyy年MM月dd日')">{{account.logintime | dateFormat('yyyy年MM月dd日')}}</time>
				<div class="options">
					<span @click="openPopInit(account.uid)">密码重置</span>
					<span @click="openPopDel(account.uid)">删除</span>
				</div>
			</li>
		</ul>
		<div class="z-page-ctrl z-clearfix">
			<div class="z-page-prev" @click="goPage(pageNow-1)" v-show="pageNow != 1">上一页</div>
			<div class="z-page-num" v-for="pageBtn in pageBtnList" :class="pageBtn == pageNow ? 'action' : ''" @click="goPage(pageBtn)">{{pageBtn}}</div>
			<div class="z-page-next" @click="goPage(pageNow+1)" v-show="pageNow != pageCount">下一页</div>
			<div class="z-page-jump"><label>跳转到第</label><input type="number" min="1" :max="pageCount" v-model="pageInput" @keyup.enter="goPage(pageInput)"><label>页，共{{pageCount}}页</label></div>
		</div>
		<div class="z-pop pop-account" v-show="showPopAccount">
			<div class="pop-blank">
				<input type="text" placeholder="请输入新建的用户名" v-model="username">
			</div>
			<div class="pop-blank">注：初始密码同用户名</div>
			<div class="z-pop-action z-clearfix">
				<button @click="addAccount()">确定</button>
				<button class="z-pop-cancel" @click="closePopAccount()">取消</button>
			</div>
		</div>
		<div class="z-pop z-pop-del" v-show="showPopInit">
			<div class="pop-blank">
				此账号密码将会被初始化，与用户名相同！
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="pwdInit()">确定</button>
				<button class="z-pop-cancel" @click="closePopInit()">取消</button>
			</div>
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
				accountList: [],
				accountTypeList: [],
				accountTypeID: 1,
				lang: 1,
				search: "",
				accountID: "",
				username: "",
				oldPwd: "",
				newPwd: "",
				showPopAccount : false,
				showAdd: false,
				showChangePwd: false,
				showPopInit: false,
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
				this.getAccountList()
			})
		},
		methods: {
			getAccountList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=admin&m=index&page=' + _self.pageNow + '&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.accountList = data.list
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
			openPopAccount: function() {
				this.username = ""
				this.showCover = true
				this.showPopAccount = true
			},
			addAccount: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=admin&m=add_admin&token=' + _self.$store.getters.token + "&username=" + _self.username,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.closePopAccount()
    					_self.getAccountList()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopAccount: function() {
				this.showPopAccount = false
				this.showCover = false
			},
			openPopInit: function(accountID) {
				this.accountID = accountID
				this.showCover = true
				this.showPopInit = true
			},
			pwdInit: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=admin&m=init_password&token=' + _self.$store.getters.token + '&uid=' + _self.accountID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					alert("重置密码成功！")
    					_self.closePopInit()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopInit: function() {
				this.showPopInit = false
				this.showCover = false
			},
			openPopDel: function(accountID) {
				this.accountID = accountID
				this.showCover = true
				this.showPopDel = true
			},
			del: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=admin&m=del_admin&token=' + _self.$store.getters.token + '&uid=' + _self.accountID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getAccountList()
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
					this.getAccountList()
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
			},
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
	.accountlist {
		padding-top: 20px;
		padding-bottom: 20px;
		
		.account-type {
			padding: 30px 40px 20px;
		}
		
		.add-account {
			padding: 0 20px 15px;
		}

		.z-table {

			li {

				h3 {
					width: 15%;
				}

				time {
					width: 20%;
				}

				.options {
					width: 45%;
				}
			}
		}

		.pop-account {
			margin-top: -100px;
			margin-left: -210px;
		}
	}
</style>