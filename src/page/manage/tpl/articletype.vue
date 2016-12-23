<template>
	<div class="articletype z-main-right">
		<div class="add-articletype">
			<button @click="openPopAdd()">新增栏目</button>
		</div>
		<ul class="z-table">
			<li class="z-table-first">
				<h3 class="articletype-name">简体名称</h3>
				<h3 class="articletype-name">繁体名称</h3>
				<h3 class="articletype-name">英文名称</h3>
				<div>栏目类型</div>
				<time>最后修改时间</time>
				<div class="options">操作</div>
			</li>
			<li v-for="(articleType, index) in articleTypeList">
				<h3 class="articletype-name">{{articleType.name1}}</h3>
				<h3 class="articletype-name">{{articleType.name2}}</h3>
				<h3 class="articletype-name">{{articleType.name3}}</h3>
				<div>{{articleType.type_name == "" ? "固定栏目" : articleType.type_name}}</div>
				<time :datetime="getMyDate(articleType.dateline)">{{getMyDate(articleType.dateline)}}</time>
				<div>
					<span @click="">口口</span>
				</div>
			</li>
		</ul>
		<div class="z-pop pop-add" v-show="showPopAdd">
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
				<button @click="addArticleType()">确定</button>
				<button class="z-pop-cancel" @click="closePop()">取消</button>
			</div>
		</div>
		<div class="z-cover" v-show="showCover"></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				articleTypeList: [],
				nameCHS: "",
				nameCHT: "",
				nameEN: "",
				showCover: 0,
				showPopAdd: 0,
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.getArticleTypeList()
			})
		},
		methods: {
			getArticleTypeList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=get_article_type_list&token=' + _self.$store.getters.token,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.articleTypeList = data.list
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
			openPopAdd: function() {
				this.nameCHS = ""
				this.nameCHT = ""
				this.nameEN = ""
				this.showCover = 1
				this.showPopAdd = 1
				this.getArticleTypeList()
			},
			addArticleType: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/admin/index.php?c=article&m=add_article_type&token=' + _self.$store.getters.token + '&name1=' + _self.nameCHS + '&name2=' + _self.nameCHT + '&name3=' + _self.nameEN,
				).then((response) => {
					const data = response.data
					const status = response.data.status
					_self.showCover = 0
					_self.showPopAdd = 0
    				if(status === 1) {
    					_self.getArticleTypeList()
    				} else {
    					_self.$router.push('/login')
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			closePop: function() {
				this.showCover = 0
				this.showPopAdd = 0
			}
		}
	}
</script>

<style lang="sass">
	.articletype {
		padding-top: 40px;
		padding-bottom: 20px;
		
		.add-articletype {
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

		.pop-add {
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