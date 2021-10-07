<template>
	<view>
		<view class="content" hover-class="blue" @click="toDongHuoList">
			<image class="content-img" src="../../static/dh.png" mode=""></image>
			<text class="content-text">动火作业证</text>
		</view>
		<view class="content" hover-class="blue" @click="toDongTuList">
			<image class="content-img" src="../../static/dt.png" mode=""></image>
			<text class="content-text">动土作业证</text>
		</view>
		<view class="content" hover-class="blue" @click="toDuanLuList">
			<image class="content-img" src="../../static/dl.png" mode=""></image>
			<text class="content-text">断路作业证</text>
		</view>
		<view class="content" hover-class="blue" @click="toMangBanList">
			<image class="content-img" src="../../static/mbcd.png" mode=""></image>
			<text class="content-text">盲板抽堵证</text>
		</view>
		<view class="content" hover-class="blue" @click="toYongDianList">
			<image class="content-img" src="../../static/lsyd.png" mode=""></image>
			<text class="content-text">临时用电证</text>
		</view>
		<view class="content" hover-class="blue" @click="toDengGaoList">
			<image class="content-img" src="../../static/dg.png" mode=""></image>
			<text class="content-text">登高作业证</text>
		</view>
		<view class="content" hover-class="blue" @click="toDiaoZhuangList">
			<image class="content-img" src="../../static/dz.png" mode=""></image>
			<text class="content-text">吊装作业证</text>
		</view>
		<view class="content" hover-class="blue" @click="toShouXianList">
			<image class="content-img" src="../../static/sxkj.png" mode=""></image>
			<text class="content-text">受限空间证</text>
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
			//动火作业证列表
			toDongHuoList(){
				uni.navigateTo({
					url:'./donghuo'
				})
			},
			//动土作业列表
			toDongTuList(){
				uni.navigateTo({
					url:'./dongtu'
				})
			},
			//断路作业列表
			toDuanLuList(){
				uni.navigateTo({
					url:'./duanlu'
				})
			},
			//盲板抽堵作业列表
			toMangBanList(){
				uni.navigateTo({
					url:'./mangbanchoudu'
				})
			},
			//临时用电
			toYongDianList(){
				uni.navigateTo({
					url:'./linshiyongdian'
				})
			},
			//登高作业列表
			toDengGaoList(){
				uni.navigateTo({
					url:'./denggao'
				})
			},
			//吊装作业列表
			toDiaoZhuangList(){
				uni.navigateTo({
					url:'./dianzhuang'
				})
			},
			//受限空间
			toShouXianList(){
				uni.navigateTo({
					url:'./shouxiankongjian'
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
		background-color: #deffd5;
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
