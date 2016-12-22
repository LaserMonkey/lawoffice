<template>
	<div class="practicelist z-main-right">
		<div class="practice-type">
			<label>口口口口：</label>
			<select name="practiceType" v-model="practiceTypeID" @change="getPracticeList()">
				<option v-for="(practiceType, index) in practiceTypeList" :value="practiceType.id" :disabled="practiceType.disable == 0 ? true : false">{{practiceType.name1}}</option>
			</select>
			<label>口口：</label>
			<select name="practiceLang" v-model="lang" @change="getPracticeList()">
				<option value="1">简体</option>
				<option value="2">繁體</option>
				<option value="3">ENGLISH</option>
			</select>
			<input placeholder="按业务领域模糊查询" v-model="search" @keyup.enter="getPracticeList()">
		</div>
		<div class="add-practice">
			<button @click="$router.push('/practice')">口口口口</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="practice-title">口口</h3>
				<div>口口口口</div>
				<time>口口口口</time>
				<div>口口</div>
			</li>
			<li v-for="(practice, index) in practiceList">
				<h3 class="practice-title">{{practice.title}}</h3>
				<div>{{practice.type_name}}</div>
				<time :datetime="getMyDate(practice.dateline)" :alt="getMyDate(practice.dateline)">{{getMyDate(practice.dateline)}}</time>
				<div class="options">
					<router-link :to="{name: 'practice', query: {practiceid: practice.id}}">口口</router-link>
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
			}
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