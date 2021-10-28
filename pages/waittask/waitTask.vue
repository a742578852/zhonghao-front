<template>
	<view>
		</u-popup>
		<view class="content">
			<view class="content-item1">
				<text>待办任务列表</text>
			</view>

		</view>
		<view class="" style="overflow: hidden;">
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in csListArrl"
				:style="'right:'+item.right+'px'" @click="updateDbrw(item)">
				<view class="mid-item1">
					<text style="width: 65%;">{{item.title}}</text>
					<text></text>
				</view>
				<view class="mid-item2">
					<text>上级节点:{{item.preusername}}</text>
				</view>
				<view class="mid-item3">
					{{item.gettime}}
				</view>
 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				csListArrl: [{
					name: '小A',
					age: '18',
					right: 0
				}],


			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.switchTab({
				url: '../index/index'
			})
			return true;
		},
		methods: {
			//查看/修改风险管控信息
			updateDbrw(item) {
				// var dbId = item.docid
				var items = JSON.stringify(item)
				console.log(items);
				uni.navigateTo({
					url:'danger/dangerDetail?items='+items
					
				})
			}
		},
		async onShow() {
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getWaitTask',
			})
			this.csListArrl = res.data.data
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
