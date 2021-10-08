<template>
	<view>
		<!-- <u-popup v-model="show" mode="center" width="90%" height="30%" border-radius="14">
			<view class="popup">
				<view class="popup-item">
					<text class="popup-item-text">新闻标题：</text>
					<input class="popup-item-input" type="text" value="" />
				</view>
				
			</view>
			<button type="primary" style="width: 50%;" @click="serach">确定</button>
		</u-popup> -->
		<!-- <view class="content">
			<view class="content-item1">
				<text>安全新闻列表</text>
			</view>
			<view class="content-item2">
				<view class="content-item2-son" @click="show = true">
					<image class="content-item2-img" src="../../static/cx.png" mode=""></image>
					<text>查询</text>
				</view>
				<view class="content-item2-son" @click="addNews">
					<image class="content-item2-img" src="../../static/xz.png" mode=""></image>
					<text>新增</text>
				</view>
			</view>
		</view> -->
		<view class="" style="overflow: hidden;">
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in csListArrl"  @click="updateGg(item)">
				<view class="mid-item1">
					<text style="width: 65%;">{{item.bt}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2">
					<text>{{item.fbrq}}</text>
				</view>
				<view class="mid-item3">
					<input type="text" v-model="item.authororgname" maxlength="16" disabled=""/>
				</view>
				<!-- <view class="remove" @click="delData(item)">删除</view> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				delBtnWidth: 100,
				
				csListArrl:[],
				startX:'',
				uuid:'',
				count:8,
				shanghua:'加载更多'
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
		onShow() {
			this.getList()
		},
		 onPullDownRefresh() {
			 this.getList()
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		    },
			//上滑加载更多
			onReachBottom() {
				console.log('触底了');
				var _this = this
				setTimeout(function () {
					if(_this.csListArrl.length - _this.count >= 8){
						_this.count += 8
					}else if(0 < _this.csListArrl.length - _this.count < 8){
						_this.count += (_this.csListArrl.length - _this.count)
					}else{
						_this.shanghua = '到底了'
					}
				    
				}, 1000);
				
			},
		methods: {
			async getList(){
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/home/homeInfo',
				
				})
				if(res.data.code == 200){
					this.csListArrl = res.data.data.notice
					
				}
				
			},
			// //新增新闻
			// addNews(){
			// 	uni.navigateTo({
			// 		url:'./addNews'
			// 	})
			// },
			// //查看/修改
			updateGg(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataGg?items='+items
				})
			},
			

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeedf1;
		// overflow: hidden
	}
	.content {
		width: 99.5%;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		border-radius: 20rpx;
		background-color: #d3fffd;
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
	.mid {
		position: relative;
		width: 98%;
		// height: 150rpx;
		border-bottom: solid 1rpx #C8C7CC;
		border-radius: 15rpx;
		font-size: 30rpx;
		margin-left: 1%;
		margin-top: 10rpx;
		
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		// align-items: center;
		.mid-item1 {
			font-size: 35rpx;
			width: 95%;
			color: #6d82dd;
			margin-left: 2.5%;
			display: flex;
			justify-content: space-between;
			padding-bottom: 5rpx;
		}
		.mid-item2 {
			width: 95%;
			margin-left: 2.5%;
			padding-bottom: 5rpx;
		}
		.mid-item3 {
			width: 70%;
			margin-left: 2.5%;
			padding-bottom: 8rpx;
		}
		.remove {
			    width: 80px;
			    height: 100%;
				border-radius: 15rpx;
			    background-color: red;
			    color: white;
			    position: absolute;
			    top: 0;
			    right: -90px;
			    display: flex;
			    justify-content: center;
			    align-items: center;
				font-size: 16px;
			}
	}
	.mid-hover {
		background-color: #c4ffd5;
	}
</style>
