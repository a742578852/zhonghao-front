<template>
	<view>
		<view class="content" hover-class="blue" @click="toZhengfu">
			<!-- <image class="content-img" src="../../static/dh.png" mode=""></image> -->
			<text class="content-text">政府检查问题</text>
		</view>
		<view class="content" hover-class="blue" @click="tosjgs">
			<!-- <image class="content-img" src="../../static/dt.png" mode=""></image> -->
			<text class="content-text">上级公司检查问题</text>
		</view>
		<view class="content" hover-class="blue" @click="tobgs">
			<!-- <image class="content-img" src="../../static/dl.png" mode=""></image> -->
			<text class="content-text">本公司检查问题</text>
		</view>
		
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
			//到政府页面
			toZhengfu(){
				uni.navigateTo({
					url:'yhzg'
				})
			},
			//上级公司隐患
			tosjgs(){
				uni.navigateTo({
					url:'sjyh'
				})
			},
			//本公司隐患
			tobgs(){
				uni.navigateTo({
					url:'bgsyh'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fdf8fd;
	}
	.content {
		width: 95%;
		height: 150rpx;
		display: flex;
		font-size: 45rpx;
		justify-content: space-around;
		align-items: center;
		background-color: #d8fcff;
		border-radius: 30rpx;
		margin: 2.5%;
		.content-img {
			width: 100rpx;
			height: 100rpx;
		}
	}
	.blue {
		background-color: #8e94ff;
	}
</style>
