<template>
	<div class="about-list z-clearfix">
		<ul class="menu">
			<li v-for="about in aboutList" :class="about.id == aboutID ? 'action' : ''" @click="getAboutDetail(about.id)">
				<router-link :to="{name: 'about', params:{columnID: columnID}, query: {id: about.id}}">{{about.title}}</router-link>
			</li>
		</ul>
		<div class="content" v-html="aboutContent"></div>
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
			}
		},
		mounted: function () {
			if(this.$route.query.id != undefined) {
				this.aboutID = this.$route.query.a
			}
			this.loadAbout()
		},
		watch: {
			'$store.getters.lang': 'changeLang'
		},
		methods: {
			changeLang: function() {
				this.lang = this.$store.getters.lang
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
			font-size: 2rem;
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
			margin-bottom: 2.5rem;
			line-height: 2.5rem;
			font-size: 1.8rem;
		}
	}
}
</style>