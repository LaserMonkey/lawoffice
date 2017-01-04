<template>
	<div class="practicelist z-main-right">
		<div class="practice-type">
			<label>业务类型：</label>
			<select name="practiceType" v-model="practiceTypeID" @change="getPracticeList()">
				<option v-for="(practiceType, index) in practiceTypeList" :value="practiceType.id" :disabled="practiceType.disable == 0 ? true : false">{{practiceType.name1}}</option>
			</select>
			<label>语言：</label>
			<select name="practiceLang" v-model="lang" @change="getPracticeList()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按业务领域模糊查询" v-model="search" @keyup.enter="getPracticeList()">
		</div>
		<div class="add-practice">
			<button @click="$router.push('/practice')">新增业务领域</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="practice-title">名称</h3>
				<div>业务类型</div>
				<time>最后修改时间</time>
				<div>操作</div>
			</li>
			<li v-for="(practice, index) in practiceList">
				<h3 class="practice-title">{{practice.title}}</h3>
				<div>{{practice.type_name}}</div>
				<time :datetime="getMyDate(practice.dateline)" :alt="getMyDate(practice.dateline)">{{getMyDate(practice.dateline)}}</time>
				<div class="options">
					<div :class="practice.disable == '0' ? 'z-blockup-li z-clearfix' : 'z-using-li z-clearfix'">
						<span class="able" @click="blockup(practice.id, practice.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(practice.id, practice.disable, index, 0)">禁用</span>
					</div>
					<router-link :to="{name: 'practice', query: {practiceid: practice.id}}">编辑</router-link>
					<span @click="openPopSort(practice.id, practice.sort)">排序</span>
					<span @click="openPopDel(practice.id)">删除</span>
				</div>
			</li>
		</ul>
		<div class="z-page-ctrl z-clearfix">
			<div class="z-page-prev">上一页</div>
			<div class="z-page-num action">1</div>
			<div class="z-page-num">2</div>
			<div class="z-page-num">3</div>
			<div class="z-page-num">4</div>
			<div class="z-page-num">5</div>
			<div class="z-page-next">下一页</div>
			<div class="z-page-jump"><label>跳转到第</label><input type="number" min="1" :max="pageCount" v-model="pageNow"><label>页，共{{pageCount}}页</label></div>
		</div>
		<div class="z-pop z-pop-sort" v-show="showPopSort">
			<div class="z-sort">
				<label>设置排序：</label>
				<input type="number" min="0" v-model="practiceSort">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="updateSort()">确定</button>
				<button class="z-pop-cancel" @click="closePopSort()">取消</button>
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
				practiceList: [],
				practiceTypeList: [],
				practiceTypeID: 1,
				lang: 1,
				pageCount: 1,
				pageNow: 1,
				perpage: 10,
				pagePrev: false,
				pageNext: false,
				totals: 2,
				search: "",
				practiceID: 0,
				showPopDel: false,
				showCover: false,
				practiceSort: "0",
				showPopSort: false,
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getPracticeList()
			})
		},
		methods: {
			getPracticeList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=index&page=' + _self.pageNow + '&title=' + _self.search + '&type=' + _self.practiceTypeID + '&lang=' + _self.lang + '&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.practiceTypeList = data.type
    					_self.practiceTypeID = data.type[0].id
    					_self.practiceList = data.list
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			getMyDate: function(time) {
				return (new Date(parseInt(time) * 1000)).toLocaleString()
			},
			blockup: function(practiceID, practiceDisable, index, action) {
				if(practiceDisable == action || (practiceDisable > '0' && action> '0')) {
					return
				}
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=disable_practices&token=' + _self.$store.getters.token + '&id=' + practiceID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(practiceDisable == '0') {
    						practiceDisable = new Date().getTime()
    					} else {
    						practiceDisable = '0'
    					}
    					_self.practiceList[index].disable = practiceDisable
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopDel: function(practiceID) {
				this.practiceID = practiceID
				this.showCover = true
				this.showPopDel = true
			},
			del: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=del_practices&token=' + _self.$store.getters.token + '&id=' + _self.practiceID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getPracticeList()
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
			openPopSort: function(practiceID, practiceSort) {
				this.practiceID = practiceID
				this.practiceSort = practiceSort
				this.showCover = true
				this.showPopSort = true
			},
			updateSort: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=sort_practices&token=' + _self.$store.getters.token + '&id=' + _self.practiceID + '&sort=' + _self.practiceSort,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getPracticeList()
    					_self.closePopSort()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopSort: function() {
				this.showPopSort = false
				this.showCover = false
			},
		}
	}
</script>

<style lang="sass">
	.practicelist {
		padding-bottom: 20px;
		
		.practice-type {
			padding: 30px 40px 20px;
		}
		
		.add-practice {
			padding: 0 20px 15px;
		}

		.z-table {

			li {

				h3 {
					width: 20%;
				}

				div {
					width: 20%;
				}

				time {
					width: 20%;
				}

				.options {
					width: 40%;
				}
			}
		}
	}
</style>