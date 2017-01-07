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
			<li v-for="(column, index) in columnList" :class="columnID == column.id ? 'action' : ''">
    			<router-link v-if="column.id==1" :to="{name: 'home', params:{columnID:column.id}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else-if="column.id==2" :to="{name: 'about', params:{columnID: column.id}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else-if="column.id==3" :to="{name: 'practice', params:{columnID:column.id}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else-if="column.id==4" :to="{name: 'lawyer', params:{columnID:column.id}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else-if="column.id==5" :to="{name: 'news', params: {columnID: column.id}, query: {type: column.type}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    			<router-link v-else :to="{name: 'column', params:{columnID:column.id}, query: {type: column.type}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				columnList: [],
				columnID: 1,
			}
		},
		mounted: function () {
			if(parseInt(this.$route.params.columnID) !== parseInt(this.$route.params.columnID)) {
				this.$store.commit('changeColumnID', 1)
				window.location.href="/home#/1"
			} else {
				this.$store.commit('changeColumnID', this.$route.params.columnID)
				this.columnID = this.$route.params.columnID
			}
			this.getHeadData()
		},
		methods: {
			getLang: function() {
	    		return this.$store.getters.lang
			},
			getHeadData: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?lang=' + _self.getLang() + '&c=home&m=index').then((response) => {
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
				this.columnID = columnID
			}
		}
	}
</script>

<style lang="sass">
	.head {
		padding: 2.5rem 3.33333333rem 2.08333333rem;

		li {
			display: inline-block;
			cursor: pointer;

			a {
				color: #333333;
			}
		}

		.setting {
			margin-bottom: 0.83333333rem;

			.about-us {
				float: left;

				li {
					margin-right: 3.33333333rem;
					font-size: 1.6rem;
				}
			}

			.language {
				float: right;
				margin-top: 0.25rem;
				font-size: 1.2rem;

				li {
					margin-left: 1.66666666rem;
				}
			}
		}

		.column {
			font-size: 2rem;

			li {
				margin-right: 3.33333333rem;
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