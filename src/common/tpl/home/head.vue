<template>
	<div class="head" v-if="!mobile">
		<div class="z-clearfix setting">
			<ul class="about-us" v-if="lang == 1">
				<li><router-link :to="{name: 'about', params: {columnID: 2}, query: {id: 4}}" target="_blank">联系我们</router-link></li>
				<li><router-link :to="{name: 'about', params: {columnID: 2}, query: {id: 3}}" target="_blank">加入陆通</router-link></li>
			</ul>
			<ul class="about-us" v-else-if="lang == 2">
				<li><router-link :to="{name: 'about', params: {columnID: 2}, query: {id: 11}}" target="_blank">聯繫我們</router-link></li>
				<!-- <li><router-link :to="{name: 'about', params: {columnID: 2}, query: {id: 3}}" target="_blank">加入陸通</router-link></li> -->
			</ul>
			<ul class="about-us" v-else-if="lang == 3">
				<li><router-link :to="{name: 'about', params: {columnID: 2}, query: {id: 6}}" target="_blank">CONTACT US</router-link></li>
				<!-- <li><router-link :to="{name: 'about', params: {columnID: 2}, query: {id: 3}}" target="_blank">JOIN US</router-link></li> -->
			</ul>
			<ul class="about-us" v-else>
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
	<div class="head" v-else-if="mobile">
		<div class="column-btn" @click="openCoverMenu()"><div class="dash"></div><div class="dash"></div><div class="dash"></div></div>
		<label v-for="column in columnList" v-if="column.id == columnID">{{column.name}}</label>
		<div class="cover-menu" v-if="showCoverMenu">
			<div class="head">
				<div class="column-btn" @click="closeCoverMenu()"><div class="dash"></div><div class="dash"></div><div class="dash"></div></div>
			</div>
			<div class="column-list">
				<ul class="column">
					<li v-for="(column, index) in columnList">
    					<router-link v-if="column.id==1" :to="{name: 'home', params:{columnID:column.id}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    					<router-link v-else-if="column.id==2" :to="{name: 'about', params:{columnID: column.id}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    					<router-link v-else-if="column.id==3" :to="{name: 'practice', params:{columnID:column.id}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    					<router-link v-else-if="column.id==4" :to="{name: 'lawyer', params:{columnID:column.id}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    					<router-link v-else-if="column.id==5" :to="{name: 'news', params: {columnID: column.id}, query: {type: column.type}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
    					<router-link v-else :to="{name: 'column', params:{columnID:column.id}, query: {type: column.type}}" @click.native="changeColumnID(column.id)">{{ column.name }}</router-link>
					</li>
				</ul>
				<ul>
					<li>
    					<router-link :to="{name: 'about', params:{columnID: 2}, query: {id: 4}}" @click.native="changeColumnID(2)">联系我们</router-link>
    					<router-link :to="{name: 'about', params:{columnID: 2}, query: {id: 3}}" @click.native="changeColumnID(2)">加入陆通</router-link>
					</li>
				</ul>
				<ul class="language">
					<li>
						<a @click="changeLang(1)">中文简体</a>
						<a @click="changeLang(2)">中文繁體</a>
						<a @click="changeLang(3)">ENGLISH</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				columnList: [],
				columnID: 1,
				lang: 1,
				mobile: false,
				showCoverMenu: false,
			}
		},
		mounted: function () {
			if(navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
				this.mobile = true
			} else {
				this.mobile = false
			}
			// if(parseInt(this.$route.params.columnID) !== parseInt(this.$route.params.columnID)) {
			// 	this.$store.commit('changeColumnID', 1)
			// 	window.location.href="/home#/1"
			// } else {
			// 	this.$store.commit('changeColumnID', this.$route.params.columnID)
			// 	this.columnID = this.$route.params.columnID
			// }
			this.lang = localStorage.getItem("lang")
			this.getHeadData()
		},
		methods: {
			getHeadData: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?lang=' + _self.lang + '&c=home&m=index').then((response) => {
    				this.columnList = response.data.column
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			changeLang: function(langType) {
				if(langType === this.lang) {
					return
				} else if(langType === 1) {
					this.$store.commit('changeLang', langType)
					localStorage.setItem("lang", langType)
					this.lang = langType
					this.getHeadData()
					window.location.href="/home#/1"
				} else if(langType === 2) {
					this.$store.commit('changeLang', langType)
					localStorage.setItem("lang", langType)
					this.lang = langType
					this.getHeadData()
					window.location.href="/home#/1"
				} else if(langType === 3) {
					this.$store.commit('changeLang', langType)
					localStorage.setItem("lang", langType)
					this.lang = langType
					this.getHeadData()
					window.location.href="/home#/1"
				} else {
					this.$store.commit('changeLang', 1)
					localStorage.setItem("lang", 1)
					this.lang = 1
					this.getHeadData()
					window.location.href="/home#/1"
				}
				this.closeCoverMenu()
			},
			changeColumnID: function(columnID) {
				this.$store.commit('changeColumnID', columnID)
				this.columnID = columnID
				this.closeCoverMenu()
			},
			openCoverMenu: function() {
				this.showCoverMenu = true
			},
			closeCoverMenu: function() {
				this.showCoverMenu = false
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

@media only screen and (max-width: 480px) {
	.head {
		position: relative;
		height: 5rem;
		padding: 1.25rem 1.66666667rem;
		line-height: 2.5rem;
		font-size: 1.8rem;
		text-align: center;

		label {
			font-size: 2rem;
		}

		.column-btn {
			position: absolute;
			top: 1.6rem;
			left: 1.66666667rem;
			width: 1.66666667rem;
			height: 1.66666667rem;

			.dash {
				height: 0.8rem;
				border-top: solid 0.2rem #df001f;
			}
		}
	}

	.cover-menu {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.85);
		z-index: 9;

		.head {

			.column-btn {

				.dash {
					border-top: solid 0.2rem white;
				}
			}
		}

		.column-list {
			padding: 0.83333333rem 2.5rem;
			font-size: 1.8rem;
			color: white;

			ul {
				margin-bottom: 1.66666667rem;
				border-bottom: solid 0.1rem rgba(255, 255, 255, 0.2);

				li {
					display: block;
					margin-right: 0;
    				margin-bottom: 1.66666667rem;
    				text-align: left;

    				a {
    					margin-right: 1.66666667rem;
    					color: white;
    				}
				}
			}

			.language {
				border-bottom: 0;
			}
		}
	}
}
</style>