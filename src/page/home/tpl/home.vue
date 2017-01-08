<template>
	<div class="home">
		<div class="swiper-container home-banner">
        	<div class="swiper-wrapper">
            	<div class="swiper-slide" style="background-image:url(http://photo.enterdesk.com/2009-5-5/enterdesk.com-3916291CA374F2BFED3FC636EE5CFBF7.jpg)">
        			<h2>陆通联合律师当选欧洲竞争与规制学院法律委员</h2>
        		</div>
            	<div class="swiper-slide" style="background-image:url(http://desk.fd.zol-img.com.cn/t_s960x600c5/g3/M03/0D/03/Cg-4V1S_EOWIMyUCAAhG5zFfIHUAATsVQNFKM0ACEb_770.jpg)">
            		<h2>陆通联合律师当选欧洲竞争</h2>
            	</div>
        	</div>
        	<div class="swiper-button">
        		<div class="swiper-button-next swiper-button-white"></div>
        		<div class="swiper-button-prev swiper-button-white"></div>
        	</div>
    	</div>
		<div class="swiper-container home-hot">
        	<div class="swiper-wrapper">
            	<div class="swiper-slide">
            		<div style="background-image:url(http://photo.enterdesk.com/2009-5-5/enterdesk.com-3916291CA374F2BFED3FC636EE5CFBF7.jpg)">
            			<span>路通历史</span>
            		</div>
            		<h3>陆通联合律师当选欧洲竞争与规制学院法律委员</h3>
            	</div>
            	<div class="swiper-slide">
					<div style="background-image:url(http://desk.fd.zol-img.com.cn/t_s960x600c5/g3/M03/0D/03/Cg-4V1S_EOWIMyUCAAhG5zFfIHUAATsVQNFKM0ACEb_770.jpg)">
            			<span>新闻动态</span>
            		</div>
            		<h3>陆通上海律师为某知名生物科技公司成功提供反舞弊法律服务</h3>
            	</div>
            	<div class="swiper-slide">
            		<div style="background-image:url(http://photo.enterdesk.com/2009-5-5/enterdesk.com-3916291CA374F2BFED3FC636EE5CFBF7.jpg)">
            			<span>路通历史</span>
            		</div>
            		<h3>陆通联合律师当选欧洲竞争与规制学院法律委员</h3>
            	</div>
            	<div class="swiper-slide">
					<div style="background-image:url(http://desk.fd.zol-img.com.cn/t_s960x600c5/g3/M03/0D/03/Cg-4V1S_EOWIMyUCAAhG5zFfIHUAATsVQNFKM0ACEb_770.jpg)">
            			<span>新闻动态</span>
            		</div>
            		<h3>陆通上海律师为某知名生物科技公司成功提供反舞弊法律服务</h3>
            	</div>
            	<div class="swiper-slide">
            		<div style="background-image:url(http://photo.enterdesk.com/2009-5-5/enterdesk.com-3916291CA374F2BFED3FC636EE5CFBF7.jpg)">
            			<span>路通历史</span>
            		</div>
            		<h3>陆通联合律师当选欧洲竞争与规制学院法律委员</h3>
            	</div>
            	<div class="swiper-slide">
					<div style="background-image:url(http://desk.fd.zol-img.com.cn/t_s960x600c5/g3/M03/0D/03/Cg-4V1S_EOWIMyUCAAhG5zFfIHUAATsVQNFKM0ACEb_770.jpg)">
            			<span>新闻动态</span>
            		</div>
            		<h3>陆通上海律师为某知名生物科技公司成功提供反舞弊法律服务</h3>
            	</div>
            	<div class="swiper-slide">
            		<div style="background-image:url(http://photo.enterdesk.com/2009-5-5/enterdesk.com-3916291CA374F2BFED3FC636EE5CFBF7.jpg)">
            			<span>路通历史</span>
            		</div>
            		<h3>陆通联合律师当选欧洲竞争与规制学院法律委员</h3>
            	</div>
            	<div class="swiper-slide">
					<div style="background-image:url(http://desk.fd.zol-img.com.cn/t_s960x600c5/g3/M03/0D/03/Cg-4V1S_EOWIMyUCAAhG5zFfIHUAATsVQNFKM0ACEb_770.jpg)">
            			<span>新闻动态</span>
            		</div>
            		<h3>陆通上海律师为某知名生物科技公司成功提供反舞弊法律服务</h3>
            	</div>
        	</div>
        	<div class="swiper-button-next swiper-button-white"></div>
        	<div class="swiper-button-prev swiper-button-white"></div>
    </div>
	</div>
</template>

<script type="text/javascript">
	require('swiper/swiper.css')
	import Swiper from 'swiper/swiper.js'

	export default {
		mounted () {
			const swiperHomeBanner = new Swiper('.home-banner', {
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				lang: 1,
			})
			const swiperHomeHot = new Swiper('.home-hot', {
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				slidesPerView: 1,
				spaceBetween: 1,
				breakpoints: {
					1920: {
						slidesPerView: 4
					},
					1366: {
						slidesPerView: 3
					},
					1024: {
						slidesPerView: 2
					}
				}
			})
		},
		watch: {
			'$store.getters.lang': 'changeLang'
		},
		methods: {
			changeLang: function() {
				this.lang = this.$store.getters.lang
			},
		}
	}
</script>

<style lang="sass">
	.home-banner {
		height: 41.66666666rem;
		
		.swiper-slide {
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
			
			h2 {
				position: relative;
				top: 78%;
				width: 50%;
				margin: 0 auto;
				text-align: center;
				font-size: 3rem;
				font-weight: normal;
				color: white;
			}
		}

		.swiper-button {
			position: relative;
			bottom: 18%;
			width: 60%;
			margin: 0 auto;

			.swiper-button-next, .swiper-button-prev {
				width: 3.33333333rem;
				height: 3.33333333rem;
				background-color: black;
				-moz-background-size: 1.16666666rem 2rem;
				-webkit-background-size: 1.16666666rem 2rem;
				background-size: 1.16666666rem 2rem;
			}

			.swiper-button-next {
				right: 0;
			}

			.swiper-button-prev {
				left: 0;
			}
		}

	}

	.home-hot {
		height: 45rem;
		padding-top: 0.08333333rem;
		background-color: #c1a09c;

		.swiper-slide {
			background-color: black;

			div {
				position: relative;
				width: 100%;
				height: 24.16666666rem;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;

				span {
					display: block;
					position: absolute;
					bottom: -1.75rem;
					padding: 0.83333333rem 4.16666666rem;
					font-size: 2rem;
					color: white;
					background-color: #df001f;
				}
			}

			h3 {
				padding: 3.33333333rem 4.16666666rem;
				line-height: 2.666666666rem;
				font-size: 2.4rem;
				font-weight: normal;
				color: #ccc;
			}
		}

		.swiper-button-next, .swiper-button-prev {
			top: 0;
			width: 3.33333333rem;
			height: 45rem;
			margin-top: 0;
			background-color: #df001f;
			-moz-background-size: 1.16666666rem 2rem;
			-webkit-background-size: 1.16666666rem 2rem;
			background-size: 1.16666666rem 2rem;
		}

		.swiper-button-next {
			right: 0;
		}

		.swiper-button-prev {
			left: 0;
		}
	}
</style>