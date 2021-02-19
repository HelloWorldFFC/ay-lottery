<template>
	<view>
		<turnLottery v-if="type==1" 
		:themeColor="themeColor" 
		:btn_Color="btn_Color" 
		:seled_Color="seled_Color" 
		:seled_t_Color="seled_t_Color" 
		:un_seled_Color="un_seled_Color"
		:un_seled_t_Color="un_seled_t_Color"
		:show_again="show_again"
		:again_txt="again_txt"
		:result_txt="result_txt"
		:tips_init="tips_init"
		:no_z_init="no_z_init"
		@show="show" 
		@again="again" ></turnLottery>
		
		
		<marquee v-if="type==2" :list="list" :themeColor="themeColor" :bgColor="bgColor" :bg_sd_Color="bg_sd_Color" @result="result" @toDetailPage="toDetailPage"></marquee>
		
		<turnplate v-if="type==3" :list="list" :chance_num_init="chance_num_init" :height="height" :width="width" @result="result" @toDetailPage="toDetailPage"></turnplate>
		
		<blow v-if="type==4" ref="blowRef" :result_txt="result_txt"  :height="height" :width="width" :themeColor="themeColor" :txtColor="txtColor"
		 :txtFontSize="txtFontSize" :canvasId="canvasId"></blow>
		 
	</view>
</template>

<script>
	import marquee from './marquee.vue';
	import turnplate from './turnplate.vue';
	import turnLottery from './turnLottery.vue';
	import blow from './blow.vue';
	
	export default {
		components: {
			marquee,
			turnplate,
			turnLottery,
			blow,
		},
		props: {
			type: {
				type: Number,
				default: 1, //1:翻牌  2:跑马灯 3：转盘 4： 刮一刮（小程序组件不显示刮层）
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			
			height: {
				type: Number,
				default: 150
			},
			width: {
				type: Number,
				default: 150
			},
			themeColor: {
				type: String,
				default: '#33CCCC',
			},
			btn_Color: {
				type: String,
				default: '#ffffff',
			},
			seled_Color: {
				type: String,
				default: '#f43f3b',
			},
			seled_t_Color: {
				type: String,
				default: '#98FB98',
			},
			un_seled_Color: {
				type: String,
				default: '#00BFFF',
			},
			un_seled_t_Color: {
				type: String,
				default: '#33CCCC',
			},
			result_txt: {
				type: String,
				default: '中奖结果',
			},
			show_again: {
				type: Boolean,
				default: false
			},
			again_txt: {
				type: String,
				default: '重新开始',
			},
			tips_init: {
				type: String,
				default: '点击',
			},
			no_z_init: {
				type: String,
				default: '谢谢参与',
			},
			bgColor: {
				type: String,
				default: '#1E90FF',
			},
			bg_sd_Color: {
				type: String,
				default: '#4169E1',
			},
			
			chance_num_init :{
				type: Number,
				default: 5
			},
			height: {
				type: Number,
				default: 700
			},
			width: {
				type: Number,
				default: 700
			},
			txtColor: {
				type: String,
				default: '#FFFFFF',
			},
			txtFontSize: {
				type: Number,
				default: 50,
			},
			canvasId: {
				type: String,
				default: 'blow',
			},
		},
		computed: {


		},

		watch: {

		},
		data() {
			return {

			};
		},

		methods: {
			initBlow(){
				this.$refs.blowRef.initBlow()
			},
			show(e){
				this.$emit('show', e);
			},
			again(e){
				this.$emit('again', e);
			},
			result(e){
				this.$emit('result', e);
			},
			toDetailPage(e){
				this.$emit('toDetailPage', e);
			},
		},
	}
</script>

<style lang="scss">

</style>
