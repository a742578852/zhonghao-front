<template>
	<view>
		<view class="yanpan" @click="toBanzu">班组级风险研判</view>
		<view class="yanpan" @click="toChejian">车间级级风险研判</view>
		<view class="yanpan" @click="toGongsi">公司级风险研判</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.switchTab({
				url:'../index/index'
			})
			return true;
		},
		methods: {
			toBanzu(){
				uni.navigateTo({
					url:'./banZuYanPan'
				})
			},
			toChejian(){
				uni.navigateTo({
					url:'./cheJianYanPan'
				})
			},
			toGongsi(){
				uni.navigateTo({
					url:'./gongSiYanPan'
				})
			}
		}
	}
</script>

<style lang="scss">
	.yanpan {
		color: #FFFFFF;
		font-size: 35rpx;
		width: 80%;
		height: 100rpx;
		margin-left: 10%;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 20rpx;
		background-color: #a1a6ff;
	}
</style>
