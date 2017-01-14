<template>
	<div class="column z-main-right">
		<div class="add-column">
			<button @click="openPopColumn(-1, 0)">新增栏目</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="column-name">简体名称</h3>
				<h3 class="column-name">繁体名称</h3>
				<h3 class="column-name">英文名称</h3>
				<div>栏目类型</div>
				<time>最后修改时间</time>
				<div class="options">操作</div>
			</li>
			<li v-for="(column, index) in columnList">
				<h3 class="column-name">{{column.name1}}</h3>
				<h3 class="column-name">{{column.name2}}</h3>
				<h3 class="column-name">{{column.name3}}</h3>
				<div>{{column.type_name == "" ? "固定栏目" : column.type_name}}</div>
				<time :datetime="column.dateline | dateFormat('yyyy年MM月dd日')">{{column.dateline | dateFormat('yyyy年MM月dd日')}}</time>
				<div>
					<span @click="openPopSort(column.id, column.sort)">排序</span>
					<span @click="openPopColumn(index, column.id)" v-if="column.fixed == 0">编辑</span>
					<span @click="openPopDel(column.id)" v-if="column.fixed == 0">删除</span>
				</div>
			</li>
		</ul>
		<div class="z-pop pop-column" v-show="showPopColumn">
			<div>
				<label>文章分类：</label>
				<select name="articleType" v-model="articleTypeID">
					<option v-for="(articleType, index) in articleTypeList" :value="articleType.id" :disabled="articleType.disable == 0 ? true : false">{{articleType.name1}}</option>
				</select>
			</div>
			<div class="pop-blank">
				<label>简体名称：</label>
				<input type="text" placeholder="请输入栏目简体名称" v-model="nameCHS">
			</div>
			<div class="pop-blank">
				<label>繁体名称：</label>
				<input type="text" placeholder="请输入栏目繁体名称" v-model="nameCHT">
			</div>
			<div class="pop-blank">
				<label>英文名称：</label>
				<input type="text" placeholder="请输入栏目英文名称" v-model="nameEN">
			</div>
			<div class="z-pop-action z-clearfix">
				<button @click="addColumn()" v-show="showAddBtn">确定</button>
				<button @click="editColumn()" v-show="showEditBtn">确定</button>
				<button class="z-pop-cancel" @click="closePopColumn()">取消</button>
			</div>
		</div>
		<div class="z-pop z-pop-sort" v-show="showPopSort">
			<div class="z-sort">
				<label>设置排序：</label>
				<input type="number" min="0" v-model="columnSort">
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
				<button @click="delColumn()">确定</button>
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
				articleTypeID: 0,
				articleTypeList: [],
				columnList: [],
				nameCHS: "",
				nameCHT: "",
				nameEN: "",
				showCover: false,
				showPopColumn: false,
				showPopSort: false,
				columnSort: "0",
				showPopDel: false,
				columnID: 0,
				showEditBtn: false,
				showAddBtn: false,
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getColumnList()
				this.getArticleTypeList()
			})
		},
		methods: {
			getColumnList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=get_column_list&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.columnList = data.list
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			openPopColumn: function(index, columnID) {
				this.columnID = columnID
				if(index == -1) {
					this.articleTypeID =this.articleTypeList[0].id,
					this.nameCHS = "",
					this.nameCHT = "",
					this.nameEN = "",
					this.showEditBtn = false
					this.showAddBtn = true
				} else {
					this.nameCHS = this.columnList[index].name1,
					this.nameCHT = this.columnList[index].name2,
					this.nameEN = this.columnList[index].name3,
					this.articleTypeID = this.columnList[index].type,
					this.showAddBtn = false
					this.showEditBtn = true
				}
				this.showCover = true
				this.showPopColumn = true
			},
			getArticleTypeList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_type_list&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.articleTypeList = data.list
    					if(_self.articleTypeID == 0) {
    						_self.articleTypeID = data.list[0].id
    					}
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			addColumn: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=add_column&token=' + _self.$store.getters.token + '&type=' + _self.articleTypeID + '&name1=' + _self.nameCHS + '&name2=' + _self.nameCHT + '&name3=' + _self.nameEN,
				).then((response) => {
					const data = response.data
					const status = response.data.status
					_self.showCover = false
					_self.showPopColumn = false
    				if(status === 1) {
    					_self.getColumnList()
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			editColumn: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=update_column&token=' + _self.$store.getters.token + '&id=' + _self.columnID + '&type=' + _self.articleTypeID + '&name1=' + _self.nameCHS + '&name2=' + _self.nameCHT + '&name3=' + _self.nameEN,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getColumnList()
						_self.closePopColumn()
    				} else if(status === 403) {
    					_self.$router.push('/login')
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePopColumn: function() {
				this.showCover = false
				this.showPopColumn = false
			},
			openPopSort: function(columnID, columnSort) {
				this.columnID = columnID
				this.columnSort = columnSort
				this.showCover = true
				this.showPopSort = true
			},
			updateSort: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=sort_column&token=' + _self.$store.getters.token + '&id=' + _self.columnID + '&sort=' + _self.columnSort,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getColumnList()
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
			openPopDel: function(columnID) {
				this.columnID = columnID
				this.showCover = true
				this.showPopDel = true
			},
			delColumn: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=sys&m=del_column&token=' + _self.$store.getters.token + '&id=' + _self.columnID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.getColumnList()
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
	.column {
		padding-top: 40px;
		padding-bottom: 20px;
		
		.add-column {
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

		.pop-column {
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