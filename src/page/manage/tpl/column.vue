<template>
	<div class="column z-min-width">
		<div class="add-column">
			<button @click="addColumn()">新增栏目</button>
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
				<time :datetime="getMyDate(column.dateline)">{{getMyDate(column.dateline)}}</time>
				<div>
					<span @click="">口口</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				columnList: [],
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getColumnList()
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
			getMyDate: function(time) {
				return (new Date(parseInt(time) * 1000)).toLocaleString()
			}
		}
	}
</script>

<style lang="sass">
	.column {
		margin-left: 200px;
		padding-top: 40px;
		padding-bottom: 20px;
		background-color: #fafafa;
		
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
	}
</style>