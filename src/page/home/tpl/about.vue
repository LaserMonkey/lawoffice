<template>
	<div class="about-list" :class="!mobile ? 'z-clearfix' : ''">
		<ul class="menu">
			<li v-for="about in aboutList" :class="about.id == aboutID ? 'action' : ''" @click="getAboutDetail(about.id)">
				<router-link :to="{name: 'about', params:{columnID: columnID}, query: {id: about.id}}"><div class="about-title">{{about.title}}</div></router-link>
			</li>
		</ul>
		<div class="content" v-html="aboutContent"></div>
		<iframe allowTransparency="true" style="width:100%;border:none;height:905px" scrolling="no" seamless="seamless" frameborder="0" src="http://f.lingxi360.com/f?token=v1ai6Qko1mBdzQoYuVn0uApw_&embed=1" v-if="$route.query.id == 4 || $route.query.id == 11 || $route.query.id == 15"></iframe>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				columnID: 2,
				aboutList: [],
				aboutContent: "",
				aboutID: 0,
				lang: 1,
				mobile: false,
			}
		},
		mounted: function () {
			if(navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
				this.mobile = true
			} else {
				this.mobile = false
			}
			this.init()
		},
		watch: {
			'$route': 'init',
			'$store.getters.lang': 'changeLang',
		},
		methods: {
			init: function() {
				if(this.$route.query.id != undefined) {
					this.aboutID = this.$route.query.a
				}
				if(localStorage.getItem("lang") != null) {
					this.lang = localStorage.getItem("lang")
				}
				this.changeLang()
			},
			changeLang: function() {
				if(localStorage.getItem("lang") != null) {
					this.lang = localStorage.getItem("lang")
				}
				this.loadAbout()
			},
			loadAbout: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=about&m=index&lang=' + _self.lang,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.aboutList = data.list
    					if(_self.$route.query.id != undefined) {
							_self.aboutID = _self.$route.query.id
							_self.getAboutDetail(_self.aboutID)
						} else {
    						_self.aboutContent = data.info.content
    						if(data.list.length > 0) {
    							_self.aboutID = data.list[0].id
    						}
						}
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			getAboutDetail: function(aboutID) {
				this.aboutID = aboutID
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=about&m=get_about_info&id=' + aboutID,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.aboutContent = data.info.content
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			}
		}
	}
</script>

<style lang="sass">
	.about-list {
		.menu {
			float: left;
			width: 30%;
			padding: 2.5rem 4.16666666rem 2.5rem 5rem;

			li {
				width: 100%;
				height: 5.83333333rem;
				margin-bottom: 0.83333333rem;
				line-height: 5.83333333rem;
				text-align: center;
				font-size: 1.8rem;
				cursor: pointer;

				.about-title {
					display: inline-block;
					line-height: initial;
					vertical-align: middle;
				}
			}

			.action {
				background-color: #df001f;
				cursor: default;

				a {
					color: white;
				}
			}
		}

		.content {
			float: right;
			width: 70%;
			margin-top: 2.5rem;
			margin-bottom: 2.5rem;
			padding: 0.83333333rem 5rem 2.5rem;
			border-left: solid 0.08333333rem rgba(0, 0, 0, 0.1);

			h2 {
				margin-bottom: 2.5rem;
				font-size: 2.4rem;
				font-weight: normal;
			}

			p {
				margin: 0;
				line-height: 2.6rem;
				font-size: 1.6rem;
			}
		}

		iframe {
			float: right;
			width: 70% !important;
			margin-top: -2.5rem;
			border-left: .08333rem solid rgba(0,0,0,.1) !important;
		}
	}

@media only screen and (max-width: 480px) {
	.about-list {
		.menu {
			float: initial;
			width: 100%;
    		padding: 1rem;
    		border-bottom: solid 0.1rem rgba(0, 0, 0, 0.1);
			overflow-x: scroll;
			overflow-y: hidden;
			white-space: nowrap;

			li {
				display: inline-block;
				width: auto;
				height: auto;
				margin-bottom: 0;
				padding: 1rem 2.3rem;
				line-height: initial;
				font-size: 1.4rem;
				cursor: pointer;
			}

			.action {
				background-color: #df001f;
				cursor: default;

				a {
					color: white;
				}
			}
		}

		.content {
			float: initial;
			width: 100%;
			margin: 0;
    		padding: 2rem 1.5rem;
    		
			h2 {
				margin-bottom: 2.4rem;
				font-size: 1.8rem;
				font-weight: normal;
			}

			p {
				margin-bottom: 2.5rem;
				line-height: 2.5rem;
				font-size: 1.6rem;
			}
		}
	}
}
</style>