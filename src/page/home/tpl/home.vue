<template>
	<div class="home">
		<div class="swiper-container home-banner">
        	<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="slider in sliderList" :style="'background-image:url(' + slider.img + ')'">
					<img src="../../../asset/img/logo.png">
					<a :href="slider.url"><h2>{{slider.title}}</h2></a>
				</div>
        	</div>
        	<div class="swiper-button">
        		<div class="swiper-button-next swiper-button-white"></div>
        		<div class="swiper-button-prev swiper-button-white"></div>
        	</div>
    	</div>
		<div class="swiper-container home-hot">
        	<div class="swiper-wrapper">
            	<div class="swiper-slide" v-for="hot in hotList">
            		<a :href="hot.url">
            			<div>
            				<img :src="hot.img">
            				<span>{{hot.title}}</span>
            			</div>
            			<h3>{{hot.describe}}</h3>
            		</a>
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
		data: function() {
			return {
				sliderList: [],
				hotList: [],
			}
		},
		mounted: function() {
			if(localStorage.getItem("lang") != null) {
				this.lang = localStorage.getItem("lang")
			}
			this.changeLang()
		},
		watch: {
			'$store.getters.lang': 'changeLang'
		},
		methods: {
			changeLang: function() {
				this.lang = this.$store.getters.lang
				this.loadAllList()
			},
			loadAllList: function() {
				const _self = this
				this.$http.get('http://www.lutong.com/api/index.php?c=home&m=index&token=' + _self.$store.getters.token + '&lang=' + _self.lang,
				).then((response) => {
					const data = response.data
					const status = response.data.status
    				if(status === 1) {
    					_self.sliderList = data.carousel
    					_self.hotList = data.custom
						_self.$nextTick(function () {
							_self.initSwiper()
						})
    				} else {
    					alert('status: ' + status)
    				}
  				}, (response) => {
    				// TODO 错误toast提示
  				})
			},
			initSwiper: function() {
				const swiperHomeBanner = new Swiper('.home-banner', {
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					slidesPerView: 'auto',
					spaceBetween: 0,
					loop: true,
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
		}
	}
</script>

<style lang="sass">
	.home-banner {
		width: 100%;
		height: 41.66666666rem;
		
		.swiper-slide {
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;

			img {
				display: block;
				position: absolute;
				left: 50%;
				top: 50%;
				max-width: 400px;
				margin-left: -200px;
				margin-top: -70px;
			}
			
			a {
				display: block;
				height: 100%;

				h2 {
					position: relative;
					top: 79%;
					width: 50%;
					margin: 0 auto;
					text-align: center;
					font-size: 3rem;
					font-weight: normal;
					color: white;
				}
			}
		}

		.swiper-button {
			position: absolute;
			top: 78%;
			bottom: auto;
			width: 60%;
			margin: 0 auto;
			margin-left: 20%;

			.swiper-button-next, .swiper-button-prev {
				width: 3.33333333rem;
				height: 3.33333333rem;
				margin-top: 0.16666667rem;
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
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;

				img {
					max-width: 100%;
				}

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
				font-size: 2rem;
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

		.swiper-button-disabled {
			opacity: 0 !important;
		}
	}

@media only screen and (max-width: 480px) {
	.home-banner {
		height: 20rem;

		.swiper-slide {

			img {
				left: 25%;
				top: 50%;
				max-width: 50%;
				margin-left: 0;
				margin-top: -2.5rem;
			}
			
			a {

				h2 {
					top: 75%;
					width: 70%;
					font-size: 1.5rem;
				}
			}
		}

		.swiper-button {
			position: absolute;
			top: 75%;
			width: 85%;
			margin: 0 auto;
			margin-left: 7.5%;

			.swiper-button-next, .swiper-button-prev {
				top: 0;
				width: 1.66666667rem;
				height: 1.66666667rem;
				-moz-background-size: 1rem 1rem;
				-webkit-background-size: 1rem 1rem;
				background-size: 1rem 1rem;
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
		height: 25rem;

		.swiper-slide {

			div {

				span {
					bottom: -1rem;
					padding: 0.5rem 2rem;
					font-size: 1rem;
				}
			}

			h3 {
				padding: 2rem;
				line-height: 1.2rem;
				font-size: 1rem;
			}
		}

		.swiper-button-next, .swiper-button-prev {
			width: 1.5rem;
			height: 25rem;
			-moz-background-size: 1rem 1rem;
			-webkit-background-size: 1rem 1rem;
			background-size: 1rem 1rem;
		}
	}
}
</style>