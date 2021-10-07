<template>
	<view>
		<scroll-view class="scroll-view_H" scroll-x="true" >
			<view class="content" style="background-color: #bbfeff;font-size: 35rpx;">
				<view class="content-item" style="width: 20%;">
					<text>序号</text>
				</view>
				<view class="content-item">
					<text>监测点编号</text>
				</view>
				<view class="content-item" style="width: 40%;">
					<text>监测点信息</text>
				</view>
				<view class="content-item">
					<text>检测值</text>
				</view>
				<view class="content-item">
					<text>更新时间</text>
				</view>
			</view>
			<view class="content" v-for="(item,index) in yljc">
				<view class="content-item" style="width: 20%;">
					<text>{{index+1}}</text>
				</view>
				<view class="content-item">
					<text>{{item.ptId}}</text>
				</view>
				<view class="content-item" style="width: 40%;">
					<text>{{item.bz}}</text>
				</view>
				<view class="content-item">
					<text>{{item.currValue}}</text>
				</view>
				<view class="content-item">
					<text>{{item.time}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old: {
					scrollTop: 0
				},
				yljc:[]
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
		methods: {
			 async getList(){
			 	const res = await this.$myRequest({
			 		method: 'POST',
			 		url: 'api/hazard/getHazard',
			 		data:{
			 			type:3
			 		}
			 	})
			 	
			 	if(res.data.code == 200){
			 		this.yljc = res.data.data
			 		
			 	}
			 	
			 },
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeedf1;
	}
	.scroll-view_H {
		// white-space: nowrap;
		.content {
			width: 170%;
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
