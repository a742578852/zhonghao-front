<template>
	<view>
		<u-calendar v-model="shows" :mode="mode" @change="change1" ></u-calendar>
		<u-calendar v-model="shows1" :mode="mode" @change="changes1" ></u-calendar>
		<!-- <u-popup v-model="show" mode="center" width="90%" height="30%" border-radius="14"> -->
			
			
		<!-- </u-popup> -->
		<view class="content">
			<view class="content-item1">
				<text>个人任务统计</text>
			</view>
			<view class="content-item2">
				<view class="content-item2-son" @click="show = true">
					<image class="content-item2-img" src="../../static/cx.png" mode=""></image>
					<text>查询</text>
				</view>
			</view>
		</view>
		<view class="popup" v-if="show">
			<view class="popup-item">
				<text class="popup-item-text">巡检人员：</text>
				<input class="popup-item-input" type="text" v-model="xjry" />
			</view>
			<view class="popup-item">
				<text class="popup-item-text">开始时间：</text>
				<input class="popup-item-input" type="text" v-model="startTime" disabled="" @click="shows = true"/>
			</view>
			<view class="popup-item">
				<text class="popup-item-text">结束时间：</text>
				<input class="popup-item-input" type="text" v-model="endTime" disabled="" @click="shows1 = true"/>
			</view>
			<button type="primary" size="mini" style="width: 50%;margin-left: 25%;margin-top: 10rpx;" @click="serach">确定</button>
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true" >
			<view class="content" style="background-color: #bbfeff;font-size: 35rpx;">
				
				<view class="content-item">
					<text>巡检人员</text>
				</view>
				<view class="content-item" style="width: 40%;">
					<text>应完成数量</text>
				</view>
				<view class="content-item">
					<text>已完成数量</text>
				</view>
				<view class="content-item">
					<text>未完成数量</text>
				</view>
			</view>
			<view class="content" v-for="(item,index) in rwList">
				
				<view class="content-item">
					<text>{{item.xjr}}</text>
				</view>
				<view class="content-item" style="width: 40%;">
					<text>{{item.ywccs}}</text>
				</view>
				<view class="content-item">
					<text>{{item.sjwccs}}</text>
				</view>
				<view class="content-item">
					<text>{{item.wwccs}}</text>
				</view>
				
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode:'date',
				show: false,
				shows: false,
				shows1: false,
				xjry:'',
				startTime:'',
				endTime:'',
				old: {
					scrollTop: 0
				},
				rwList:[]
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.switchTab({
				url:'../safe/safe'
			})
			return true;
		},
		onShow() {
			this.getList()
		},
		methods: {
			 async getList(){
			 	const res = await this.$myRequest({
			 		method: 'POST',
			 		url: 'api/danger/getInspectStac',
			 		
			 	})
			 	if(res.data.code == 200){
			 		this.rwList = res.data.data
			 		
			 	}
			 	
			 },
			 //查询
			 async serach(){
			 	this.show = false
			 	const res = await this.$myRequest({
			 		method: 'POST',
			 		url: 'api/danger/getInspectStac',
			 		data:{
			 			"xjr":this.xjry,
			 			"startDate":this.startTime,
			 			"endDate":this.endTime
			 		}
			 	})
			 	if(res.data.code == 200){
			 		this.rwList = res.data.data
			 	}
			 	
			 },
			 change1(e){
			 	this.startTime = e.result
			 },
			 changes1(e){
			 	this.endTime = e.result
			 },
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeedf1;
	}
	.content {
		width: 99.5%;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		border-radius: 20rpx;
		background-color: #edffff;
		.content-item1 {
			width: 45%;
			height: 110rpx;
			font-size: 40rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.content-item2 {
			width: 45%;
			height: 110rpx;
			display: flex;
			.content-item2-son {
				width: 42%;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.content-item2-img {
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
	}
	
	.popup {
		
		width: 98%;
		height: 60%;
		// display: flex;
		.popup-item {
			width: 98%;
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.popup-item-input {
				width: 60%;
				height: 70rpx;
				border-bottom: solid 1rpx #C8C7CC;
			}
			.popup-item-text {
				font-size: 35rpx;
				height: 8rpx;
			}
		}
	}
	.scroll-view_H {
		// white-space: nowrap;
		.content {
			width: 100%;
			margin-bottom: 10rpx;
			padding-bottom: 10rpx;
			padding-top: 10rpx;
			background-color: #f3feff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.content-item {
				width: 40%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				white-space: pre-wrap;

			}
		}
	}
</style>
