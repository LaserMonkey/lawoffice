<template>
	<div class="practicetype z-main-right">
		<div class="add-practicetype">
			<button @click="openPopPracticeType(-1, 0)">新增业务类型</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="practicetype-name">简体名称</h3>
				<h3 class="practicetype-name">繁体名称</h3>
				<h3 class="practicetype-name">英文名称</h3>
				<div>栏目类型</div>
				<time>最后修改时间</time>
				<div class="options">操作</div>
			</li>
			<li v-for="(practiceType, index) in practiceTypeList">
				<h3 class="practicetype-name">{{practiceType.name1}}</h3>
				<h3 class="practicetype-name">{{practiceType.name2}}</h3>
				<h3 class="practicetype-name">{{practiceType.name3}}</h3>
				<div>{{practiceType.type_name == "" ? "固定栏目" : practiceType.type_name}}</div>
				<time :datetime="getMyDate(practiceType.dateline)">{{getMyDate(practiceType.dateline)}}</time>
				<div class="options">
					<div :class="practiceType.disable == '0' ? 'z-blockup-li z-clearfix' : 'z-using-li z-clearfix'">
						<span class="able" @click="blockup(practiceType.id, practiceType.disable, index, 1)">启用</span>
						<span class="disable" @click="blockup(practiceType.id, practiceType.disable, index, 0)">禁用</span>
					</div>
					<span @click="openPopPracticeType(index, practiceType.id)">编辑</span>
					<span @click="openPopSort(practiceType.id, practiceType.sort)">排序</span>
					<span @click="openPopDel(practiceType.id)">删除</span>
				</div>
			</li>
		</ul>
		<div class="z-pop pop-practicetype" v-show="showPopPracticeType">
			<div class="pop-blank">
				<label>简体名称：</label>
				<input type="text" placeholder="请输入文章分类简体名称" v-model="nameCHS">
			</div>
			<div class="pop-blank">
				<label>繁体名称：</label>
				<input type="text" placeholder="请输入文章分类繁体名称" v-model="nameCHT">
			</div>
			<div class="pop-blank">
				<label>英文名称：</label>
				<input type="text" placeholder="请输入文章分类英文名称" v-model="nameEN">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="addPracticeType()" v-show="showAddBtn">确定</button>
				<button @click="editPracticeType()" v-show="showEditBtn">确定</button>
				<button class="z-pop-cancel" @click="closePopPracticeType()">取消</button>
			</div>
		</div>
		<div class="z-pop z-pop-sort" v-show="showPopSort">
			<div class="z-sort">
				<label>设置排序：</label>
				<input type="number" min="0" v-model="practiceTypeSort">
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
				practiceTypeList: [],
				nameCHS: "",
				nameCHT: "",
				nameEN: "",
				showCover: false,
				showPopPracticeType: false,
				practiceTypeID: 0,
				practiceTypeSort: "0",
				showPopSort: false,
				showPopDel: false,
				showEditBtn: false,
				showAddBtn: true,
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getPracticeTypeList()
			})
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
			openPopPracticeType: function(index, practiceTypeID) {
				this.practiceTypeID = practiceTypeID
				if(index == -1) {
					this.nameCHS = "",
					this.nameCHT = "",
					this.nameEN = "",
					this.showEditBtn = false
					this.showAddBtn = true
				} else {
					this.nameCHS = this.practiceTypeList[index].name1,
					this.nameCHT = this.practiceTypeList[index].name2,
					this.nameEN = this.practiceTypeList[index].name3,
					this.showAddBtn = false
					this.showEditBtn = true
				}
				this.showCover = true
				this.showPopPracticeType = true
			},
			addPracticeType: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=add_practices_type&token=' + _self.$store.getters.token + '&name1=' + _self.nameCHS + '&name2=' + _self.nameCHT + '&name3=' + _self.nameEN,
				).then((response) => {
					const data = response.data
					const status = response.data.status
					_self.showCover = false
					_self.showPopPracticeType = false
    				if(status === 1) {
    					_self.getPracticeTypeList()
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editPracticeType: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=update_practices_type&token=' + _self.$store.getters.token + '&name1=' + _self.nameCHS + '&name2=' + _self.nameCHT + '&name3=' + _self.nameEN + '&id=' + _self.practiceTypeID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
					_self.showCover = false
					_self.showPopPracticeType = false
    				if(status === 1) {
    					_self.getPracticeTypeList()
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopPracticeType: function() {
				this.showCover = false
				this.showPopPracticeType = false
			},
			blockup: function(practiceTypeID, practiceTypeDisable, index, action) {
				if(practiceTypeDisable == action || (practiceTypeDisable > '0' && action> '0')) {
					return
				}
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=disable_practices_type&token=' + _self.$store.getters.token + '&id=' + practiceTypeID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					if(practiceTypeDisable == '0') {
    						practiceTypeDisable = new Date().getTime()
    					} else {
    						practiceTypeDisable = '0'
    					}
    					_self.practiceTypeList[index].disable = practiceTypeDisable
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopSort: function(practiceTypeID, practiceTypeSort) {
				this.practiceTypeID = practiceTypeID
				this.practiceTypeSort = practiceTypeSort
				this.showCover = true
				this.showPopSort = true
			},
			updateSort: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=sort_practices_type&token=' + _self.$store.getters.token + '&id=' + _self.practiceTypeID + '&sort=' + _self.practiceTypeSort,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getPracticeTypeList()
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
			openPopDel: function(practiceTypeID) {
				this.practiceTypeID = practiceTypeID
				this.showCover = true
				this.showPopDel = true
			},
			del: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=practices&m=del_practices_type&token=' + _self.$store.getters.token + '&id=' + _self.practiceTypeID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getPracticeTypeList()
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
		}
	}
</script>

<style lang="sass">
	.practicetype {
		padding-top: 40px;
		padding-bottom: 20px;
		
		.add-practicetype {
			padding: 0 20px 15px;
		}

		.z-table {

			li {

				h3 {
					width: 15%;
				}

				div {
					width: 15%;
				}

				time {
					width: 20%;
				}
				
				.options {
					width: 20%;
				}
			}
		}

		.pop-sure {
			margin-left: -150px;
		}

		.pop-practicetype {
			margin-top: -165px;
			margin-left: -200px;

			input, select {
				width: 200px;
				margin-right: 0;
			}

			.pop-blank {
				margin-bottom: 10px;
			}
		}
	}
</style>