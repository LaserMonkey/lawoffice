<template>
	<div class="lawyerlist z-main-right">
		<div class="lawyer-type">
			<label>口口口口：</label>
			<select name="lawyerType" v-model="lawyerTypeID" @change="getLawyerList()">
				<option value="1">首席及合伙人</option>
				<option value="2">律师</option>
			</select>
			<label>口口：</label>
			<select name="lawyerLang" v-model="lang" @change="getLawyerList()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按人名模糊查询" v-model="search" @keyup.enter="getLawyerList()">
		</div>
		<div class="add-lawyer">
			<button @click="$router.push('/lawyer')">口口口口</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="lawyer-title">口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
			<li v-for="(lawyer, index) in lawyerList">
				<h3 class="lawyer-title">{{lawyer.name}}</h3>
				<div>{{lawyer.type_name}}</div>
				<time :datetime="getMyDate(lawyer.dateline)" :alt="getMyDate(lawyer.dateline)">{{getMyDate(lawyer.dateline)}}</time>
				<div>
					<router-link :to="{name: 'lawyer', query: {lawyerid: lawyer.id}}">口口</router-link>
					<span @click="">口口</span>
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
				pageCount: 1,
				pageNow: 1,
				perpage: 10,
				pagePrev: false,
				pageNext: false,
				totals: 2,
				search: "",
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
					width: 25%;
				}

				div {
					width: 25%;
				}

				time {
					width: 25%;
				}

			}
		}
	}
</style>