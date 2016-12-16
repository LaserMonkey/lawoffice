<template>
	<div>
		<div class="swiper-container banner">
        	<div class="swiper-wrapper">
            	<div class="swiper-slide" style="background-image:url(http://imgsrc.baidu.com/forum/pic/item/4ec2d5628535e5dd55d2464876c6a7efcf1b62af.jpg)">
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
		<div class="swiper-container hot">
        	<div class="swiper-wrapper">
            	<div class="swiper-slide">
            		<div style="background-image:url(http://imgsrc.baidu.com/forum/pic/item/4ec2d5628535e5dd55d2464876c6a7efcf1b62af.jpg)">
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
            		<div style="background-image:url(http://imgsrc.baidu.com/forum/pic/item/4ec2d5628535e5dd55d2464876c6a7efcf1b62af.jpg)">
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
            		<div style="background-image:url(http://imgsrc.baidu.com/forum/pic/item/4ec2d5628535e5dd55d2464876c6a7efcf1b62af.jpg)">
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
            		<div style="background-image:url(http://imgsrc.baidu.com/forum/pic/item/4ec2d5628535e5dd55d2464876c6a7efcf1b62af.jpg)">
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
			const swiperBanner = new Swiper('.banner', {
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true
			})
			const swiper = new Swiper('.hot', {
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
		}
	}
</script>

<style lang="sass">
	.banner {
		height: 50rem;
		
		.swiper-slide {
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
			
			h2 {
				position: relative;
				top: 79.5%;
				width: 40%;
				margin: 0 auto;
				text-align: center;
				font-size: 3rem;
				color: white;
			}
		}

		.swiper-button {
			position: relative;
			bottom: 18%;
			width: 52%;
			margin: 0 auto;

			.swiper-button-next, .swiper-button-prev {
				width: 4rem;
				height: 4rem;
				background-color: black;
				-moz-background-size: 1.4rem 2.4rem;
				-webkit-background-size: 1.4rem 2.4rem;
				background-size: 1.4rem 2.4rem;
			}

			.swiper-button-next {
				right: 0;
			}

			.swiper-button-prev {
				left: 0;
			}
		}

	}

	.hot {
		height: 54rem;
		background-color: #c1a09c;

		.swiper-slide {
			background-color: black;

			div {
				position: relative;
				width: 100%;
				height: 29rem;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;

				span {
					display: block;
					position: absolute;
					bottom: -2.1rem;
					padding: 1rem 5rem;
					font-size: 2rem;
					color: white;
					background-color: #df001f;
				}
			}

			h3 {
				padding: 4rem 5rem;
				line-height: 2.6rem;
				font-size: 2.4rem;
				color: #ccc;
			}
		}

		.swiper-button-next, .swiper-button-prev {
			top: 0;
			width: 4rem;
			height: 54rem;
			margin-top: 0;
			background-color: #df001f;
			-moz-background-size: 1.4rem 2.4rem;
			-webkit-background-size: 1.4rem 2.4rem;
			background-size: 1.4rem 2.4rem;
		}

		.swiper-button-next {
			right: 0;
		}

		.swiper-button-prev {
			left: 0;
		}
	}
</style>