<template>
	<view>
		<u-popup v-model="show" mode="center" width="90%" height="30%" border-radius="14">
			<view class="popup">
				<view class="popup-item">
					<text class="popup-item-text">辨识部位：</text>
					<input class="popup-item-input" type="text" v-model="bsbw" />
				</view>
				<view class="popup-item">
					<text class="popup-item-text">风险等级：</text>
					<input class="popup-item-input" type="text" v-model="fxdj" />
				</view>
				<view class="popup-item">
					<text class="popup-item-text">责任部门：</text>
					<input class="popup-item-input" type="text" v-model="zrbm" />
				</view>
				<button type="primary" size="mini" style="width: 50%;margin-left: 25%;margin-top: 10rpx;" @click="serach">确定</button>
			</view>
			
		</u-popup>
		<view class="content">
			<view class="content-item1">
				<text>风险管控列表</text>
			</view>
			<view class="content-item2">
				<view class="content-item2-son" @click="show = true">
					<image class="content-item2-img" src="../../static/cx.png" mode=""></image>
					<text>查询</text>
				</view>
				<view class="content-item2-son" @click="addFxgk">
					<image class="content-item2-img" src="../../static/xz.png" mode=""></image>
					<text>新增</text>
				</view>
			</view>
		</view>
		<view class="" style="overflow: hidden;">
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in riskList" v-if="index<=count" @touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd" :style="'right:'+item.right+'px'" >
				<view class="mid-item1" @click="updateFxgk(item)">
					<text style="width: 65%;">{{item.bsbw}}</text>
					<text>{{item.fxdj}}</text>
				</view>
				<view class="mid-item2" @click="updateFxgk(item)">
					<text>{{item.zrbmzrr}}</text>
				</view>
				<view class="mid-item3" @click="updateFxgk(item)">
					<input type="text" :value="item.czfx" maxlength="16" disabled=""/>
				</view>
				<view class="remove" @click="delData(item.docid)">删除</view>
			</view>
			<view class="" style="width: 98%;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;height: 50rpx;">
				<text>{{shanghua}}</text>
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
				riskList:[],
				riskLists:[],
				zrbm:'',
				bsbw:'',
				fxdj:'',
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
				
				var _this = this
				setTimeout(function () {
						_this.count += 8
					if(_this.riskList.length <= 8){
						_this.shanghua = '到底了'
					}
				}, 1000);
				
			},
		methods: {
			async getList(){
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/risk/getRiskList',
				})
				if(res.data.code == 200){
					this.riskList = res.data.data
				}
				if(this.riskList.length <= 8){
					this.shanghua = ''
				}
			},
			//新增风险管控
			addFxgk(){
				uni.navigateTo({
					url:'./addFxgk'
				})
			},
			//查看/修改风险管控信息
			updateFxgk(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updateFxgk?items='+items
				})
			},
			//显示查询页面
			 async serach(){
				this.show = false
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/risk/getRiskList',
					data:{
						"bsbw":this.bsbw,
						"fxdj":this.fxdj,
						"zrbm":this.zrbm
					}
				})
				if(res.data.code == 200){
					this.riskList = res.data.data
				}
				if(this.riskList.length <= 8){
					this.shanghua = ''
				}
			},
			//开始触摸滑动
			drawStart(e) {
				var touch = e.touches[0];
				this.startX = touch.clientX;
			},
			//触摸滑动
			drawMove(e) {
				for (var index in this.riskList) {
					this.$set(this.riskList[index],'right',0);
				}
				var touch = e.touches[0];
				var item = this.riskList[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
				this.$set(this.riskList[e.currentTarget.dataset.index],'right',disX);
				} else {
					this.$set(this.riskList[e.currentTarget.dataset.index],'right',0);
				}
			},
			//触摸滑动结束
			drawEnd(e) {
				var item = this.riskList[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.riskList[e.currentTarget.dataset.index],'right',this.delBtnWidth);
				} else {
					this.$set(this.riskList[e.currentTarget.dataset.index],'right',0);
				}
			},
			//具体删除操作
			async delDatas(){
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/risk/delRiskInfo',
					data:{
						docid:this.uuid
					}
				})
				console.log(res);
				if(res.data.code==200){
					uni.startPullDownRefresh();
				}else{
					uni.showToast({
						title:res.data.message
					})
				}
			},
			//删除方法
			 delData(id){
				 var _this = this
				 var token = uni.getStorageSync('token')
				  this.uuid = id
				console.log(id)
				uni.showModal({
				    title: '提示',
				    content: "确认删除？",
					 success (res) {
						if (res.confirm) {
							_this.delDatas()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeedf1;
		// overflow: hidden;
		// height: 100%;
		
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
