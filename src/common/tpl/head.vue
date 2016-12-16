<template>
	<div class="head">
		<div class="z-clearfix setting">
			<ul class="about-us">
				<li>联系我们</li>
				<li>加入陆通</li>
			</ul>
			<ul class="language">
				<li @click="changeLang(1)">中文简体</li>
				<li @click="changeLang(2)">中文繁體</li>
				<li @click="changeLang(3)">ENGLISH</li>
			</ul>
		</div>
		<ul class="column">
			<li v-for="(column, index) in columnList" :class="getColumnID == column.id ? 'action' : ''">
    			<router-link v-if="column.id==1" to="/" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else-if="column.id==2" to="about" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else-if="column.id==3" to="practice" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else-if="column.id==4" to="lawyer" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else-if="column.id==5" to="article" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else to="article" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
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
		computed: {
			getColumnID() {
	    		return this.$store.getters.columnID
			},
			getLang() {
	    		return this.$store.getters.lang
			}
		},
		beforeCreate: function () {
			this.$nextTick(function () {
				this.init()
			})
		},
		// mounted: function () {
		// 	this.$nextTick(function () {
		// 		this.init()
		// 	})
		// },
		methods: {
			init: function() {
				this.getHeadData()
			},
			getHeadData: function() {
				const _seft = this
				this.$http.get('http://www.lutong.com/api/index.php?lang=' + _seft.getLang + '&c=home&m=index').then((response) => {
    				this.columnList = response.data.column
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			changeLang: function(langType) {
				if(langType === this.getLang) {
					return
				} else if(langType === 1) {
					this.$store.commit('changeLang', langType)
					localStorage.setItem("lang", langType)
					this.getHeadData()
				} else if(langType === 2) {
					this.$store.commit('changeLang', langType)
					localStorage.setItem("lang", langType)
					this.getHeadData()
				} else if(langType === 3) {
					this.$store.commit('changeLang', langType)
					localStorage.setItem("lang", langType)
					this.getHeadData()
				} else {
					this.$store.commit('changeLang', 1)
					localStorage.setItem("lang", 1)
					this.getHeadData()
				}
			},
			changeColumnID: function(columnID) {
				this.$store.commit('changeColumnID', columnID)
			}
		}
	}
</script>

<style lang="sass">
	.head {
		padding: 30px 40px 25px;

		li {
			display: inline-block;
			cursor: pointer;

			a {
				color: #333333;
			}
		}

		.setting {
			margin-bottom: 10px;

			.about-us {
				float: left;

				li {
					margin-right: 40px;
				}
			}

			.language {
				float: right;
				margin-top: 3px;
				font-size: 12px;

				li {
					margin-left: 20px;
				}
			}
		}

		.column {
			font-size: 20px;

			li {
				margin-right: 40px;
			}

			.action {
				color: #df001f;

				a {
					color: #df001f;
				}
			}
		}
	}
</style>