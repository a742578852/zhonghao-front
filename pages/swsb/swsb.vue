<template>
	<view>
		<u-popup v-model="show" mode="center" width="90%" height="40%" border-radius="14">
			<view class="popup">
				<view class="popup-item">
					<text class="popup-item-text">所属单位：</text>
					<input class="popup-item-input" type="text" v-model="ssdw" />
				</view>
				<view class="popup-item">
					<text class="popup-item-text">三违属性：</text>
					<input class="popup-item-input" type="text" v-model="swsx" />
				</view>
				<view class="popup-item">
					<text class="popup-item-text">检查人：</text>
					<input class="popup-item-input" type="text" v-model="jcr" />
				</view>
				<button type="primary" style="width: 50%;" @click="serach">确定</button>
			</view>
			
		</u-popup>
		<view class="content">
			<view class="content-item1">
				<text>三违上报列表</text>
			</view>
			<view class="content-item2">
				<view class="content-item2-son" @click="show = true">
					<image class="content-item2-img" src="../../static/cx.png" mode=""></image>
					<text>查询</text>
				</view>
				<view class="content-item2-son" @click="addSwsb">
					<image class="content-item2-img" src="../../static/xz.png" mode=""></image>
					<text>新增</text>
				</view>
			</view>
		</view>
		<view class="" style="overflow: hidden;">
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in csListArrl" v-if="index<=count" @touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd" :style="'right:'+item.right+'px'">
				<view class="mid-item1" @click="updateSwsb(item)">
					<text style="width: 65%;">{{item.ssdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updateSwsb(item)">
					<text>{{item.ccrq}}</text>
				</view>
				<view class="mid-item3" @click="updateSwsb(item)">
					<input type="text" v-model="item.swxwms" maxlength="16" disabled=""/>
				</view>
				<view class="remove" @click="delData(item.docid)">删除</view>
			</view>
			<view class=""
				style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;height: 50rpx;">
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
				jcr:'',
				swsx:'',
				ssdw:'',
				csListArrl:[],
				startX:'',
				shanghua: '加载更多',
				count: 8,
				uuid: '',
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
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			
		},
		//上滑加载更多
		onReachBottom() {
			var _this = this
			setTimeout(function() {
				if (_this.csListArrl.length - _this.count >= 8) {
					_this.count += 8
				} else if (0 < _this.csListArrl.length - _this.count < 8) {
					_this.count += (_this.csListArrl.length - _this.count)
				} else if(_this.count >= _this.csListArrl.length){
					_this.shanghua = '到底了'
				}
		
			}, 1000);
		
		},
		methods: {
			//获取三违列表
			async getList() {
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/doc/getSwList',
				})
				if (res.data.code == 200) {
					this.csListArrl = res.data.data
					
				}
				if (this.csListArrl.length <= 8) {
					this.shanghua = ''
				}
			},
			//新增三违上报
			addSwsb(){
				uni.navigateTo({
					url:'./addSanwei'
				})
			},
			//查看/修改三违三违上报
			updateSwsb(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataSanwei?items='+items
				})
			},
			//显示查询页面
			async serach(){
				this.show = false
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/doc/getSwList',
					data: {
						"jcr": this.jcr,
						"ssdw": this.ssdw,
						"swsx":this.swsx
					}
				})
				if (res.data.code == 200) {
					this.csListArrl = res.data.data
				}
				if (this.csListArrl.length <= 8) {
					this.shanghua = ''
				}
			},
			//开始触摸滑动
			drawStart(e) {
				console.log("开始触发");
				var touch = e.touches[0];
				this.startX = touch.clientX;
			},
			//触摸滑动
			drawMove(e) {
				console.log("滑动");
				for (var index in this.csListArrl) {
					this.$set(this.csListArrl[index],'right',0);
				}
				var touch = e.touches[0];
				var item = this.csListArrl[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
				this.$set(this.csListArrl[e.currentTarget.dataset.index],'right',disX);
				} else {
					this.$set(this.csListArrl[e.currentTarget.dataset.index],'right',0);
				}
			},
			//触摸滑动结束
			drawEnd(e) {
				console.log("滑动结束");
				var item = this.csListArrl[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.csListArrl[e.currentTarget.dataset.index],'right',this.delBtnWidth);
				} else {
					this.$set(this.csListArrl[e.currentTarget.dataset.index],'right',0);
				}
			},
			//具体删除操作
			async delDatas() {
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/doc/delSwInfo',
					data: {
						docid: this.uuid
					}
				})
				console.log(res);
				if (res.data.code == 200) {
					uni.startPullDownRefresh();
				}
			},
			//删除方法
			delData(id){
				var _this = this
				this.uuid = id
				uni.showModal({
				    title: '提示',
				    content: "确认删除？",
					success: function (res) {
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
		overflow: hidden
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
