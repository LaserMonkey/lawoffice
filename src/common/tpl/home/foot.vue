<template>
	<div class="foot" v-if="lang == 2">北京市陸通聯合律師事務所(Lutong Partners)版權所有&nbsp;&nbsp;京ICO備11021492號-1&nbsp;&nbsp;<router-link :to="{name: 'about', params:{columnID: 2}, query: {lang: lang, id: 12}}" target="_blank">法律聲明</router-link></div>
	<div class="foot" v-else-if="lang == 3">Lutong Partners&nbsp;&nbsp;京ICO备11021492号-1&nbsp;&nbsp;<router-link :to="{name: 'about', params:{columnID: 2}, query: {lang: lang, id: 13}}" target="_blank">Legal Notice</router-link></div>
	<div class="foot" v-else>北京市陆通联合律师事务所(Lutong Partners)版权所有&nbsp;&nbsp;京ICO备11021492号-1&nbsp;&nbsp;<router-link :to="{name: 'about', params:{columnID: 2}, query: {lang: lang, id: 8}}" target="_blank">法律声明</router-link></div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				lang: 1,
			}
		},
		watch: {
			'$store.getters.lang': 'getLang',
		},
		methods: {
			getLang: function() {
				this.lang = localStorage.getItem("lang")
			}
		},
	}
</script>

<style lang="sass">
	.foot {
		padding: 2.08333333rem 0;
		text-align: center;
		font-size: 1.2rem;
		color: #999999;
	}

@media only screen and (max-width: 480px) {
	.foot {
		padding: 1.3rem 4.5rem;
	}
}
</style>