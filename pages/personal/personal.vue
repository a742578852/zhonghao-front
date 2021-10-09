<template>
	<view>
		<view class="swipers">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true">
				<swiper-item class="swiper-item">
					<image src="../../static/jpg1.jpg" mode=""></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/jpg2.jpg" mode=""></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/jpg1.jpg" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="content" >
			<image class="img" src="../../static/touxiang.png" mode=""></image>
			<view class="content-item">
				<view class="">{{username}}</view>
				<view class="">Id:{{userid}}</view>
			</view>
		</view>
		<view class="content" hover-class="change" @click="back">
			<image class="img" src="../../static/tuichu.png" mode=""></image>
			<view class="content-item">
				<view class="">退出登录</view>
			</view>
		</view>
		<view class="content" hover-class="change">
			<image class="img" src="../../static/gengxin.png" mode=""></image>
			<view class="content-item">
				<view class="">检查更新</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				userid:''
			}
		},
		onShow() {
			this.username = uni.getStorageSync('admin').userName
			this.userid = uni.getStorageSync('admin').userId
		},
		methods: {
			back(){
				uni.removeStorageSync('token')
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	.swipers {
		// background-color: #D2F1F0;
		width: 750rpx;
		height: 330rpx;
	
		image {
			height: 100%;
			width: 100%;
		}
	}
	.content {
		width: 96%;
		height: 100rpx;
		margin-left: 2%;
		padding-left: 10rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		.content-item {
			font-size: 30rpx;
			margin-left: 50rpx;
		}
		.img {
			width: 90rpx;
			height: 90rpx;
		}
	}
	.change {
		background-color: #75b1ff;
	}
</style>
