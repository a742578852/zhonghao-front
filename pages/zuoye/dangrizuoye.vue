<template>
	<view>
		<view class="" style="overflow: hidden;">
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in dhListArrl">
				<view class="mid-item1" @click="updataDongHuo(item)">
					<text style="width: 65%;">[动火]{{item.dhzyszdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updataDongHuo(item)">
					<text>{{item.yjzysj}}</text>
				</view>
				<view class="mid-item3" @click="updataDongHuo(item)">
					<input type="text" v-model="item.dhzywzjnr" maxlength="16" disabled="" />
				</view>
			</view>
			
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in dtListArrl">
				<view class="mid-item1" @click="updataDongTu(item)">
					<text style="width: 65%;">[动土]{{item.dtzyszdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updataDongTu(item)">
					<text>{{item.yjzysj}}</text>
				</view>
				<view class="mid-item3" @click="updataDongTu(item)">
					<input type="text" v-model="item.dtzywzjnr" maxlength="16" disabled=""/>
				</view>
			</view>
			
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in dgListArrl">
				<view class="mid-item1" @click="updataDengGao(item)">
					<text style="width: 65%;">[登高]{{item.dgzyszdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updataDengGao(item)">
					<text>{{item.yjzysj}}</text>
				</view>
				<view class="mid-item3" @click="updataDengGao(item)">
					<input type="text" v-model="item.dgzywzjnr" maxlength="16" disabled=""/>
				</view>
			</view>
			
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in sxListArrl">
				<view class="mid-item1" @click="updataShouXian(item)">
					<text style="width: 65%;">[受限]{{item.zyszdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updataShouXian(item)">
					<text>{{item.yjzysj}}</text>
				</view>
				<view class="mid-item3" @click="updataShouXian(item)">
					<input type="text" v-model="item.zywzjzynr" maxlength="16" disabled=""/>
				</view>
			</view>
			
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in mbListArrl" >
				<view class="mid-item1" @click="updataMangBan(item)">
					<text style="width: 65%;">[盲板]{{item.zyszdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updataMangBan(item)">
					<text>{{item.yjzysj}}</text>
				</view>
				<view class="mid-item3" @click="updataMangBan(item)">
					<input type="text" v-model="item.zywzjnr" maxlength="16" disabled=""/>
				</view>
			</view>
			
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in lsListArrl">
				<view class="mid-item1" @click="updataLinshi(item)">
					<text style="width: 65%;">[用电]{{item.zyszdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updataLinshi(item)">
					<text>{{item.yjzysj}}</text>
				</view>
				<view class="mid-item3" @click="updataLinshi(item)">
					<input type="text" v-model="item.zywzjzynr" maxlength="16" disabled=""/>
				</view>
			</view>
			
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in dlListArrl">
				<view class="mid-item1" @click="updataDuanLu(item)">
					<text style="width: 65%;">[断路]{{item.dlzyszdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updataDuanLu(item)">
					<text>{{item.yjzysj}}</text>
				</view>
				<view class="mid-item3" @click="updataDuanLu(item)">
					<input type="text" v-model="item.dlzywzjnr" maxlength="16" disabled=""/>
				</view>
			</view>
			
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in dzListArrl">
				<view class="mid-item1" @click="updataDiaoZhuang(item)">
					<text style="width: 65%;">[吊装]{{item.dzzyszdw}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updataDiaoZhuang(item)">
					<text>{{item.yjzysj}}</text>
				</view>
				<view class="mid-item3" @click="updataDiaoZhuang(item)">
					<input type="text" v-model="item.dzzywzjnr" maxlength="16" disabled=""/>
				</view>
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
				dhzyjb: '',
				dhzydw: '',
				dhListArrl: [],
				dtListArrl: [],
				dgListArrl: [],
				dzListArrl: [],
				lsListArrl: [],
				mbListArrl: [],
				sxListArrl: [],
				dlListArrl: [],
				startX: '',
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
				url: '../index/index'
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
		// onReachBottom() {
		// 	var _this = this
		// 	setTimeout(function() {
		// 		if (_this.csListArrl.length - _this.count >= 8) {
		// 			_this.count += 8
		// 		} else if (0 < _this.csListArrl.length - _this.count < 8) {
		// 			_this.count += (_this.csListArrl.length - _this.count)
		// 		} else if(_this.count >= _this.csListArrl.length){
		// 			_this.shanghua = '到底了'
		// 		}

		// 	}, 1000);

		// },
		methods: {
			//获取今日作业证列表
			async getList() {
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/work/getWorkPerTodayList',
				})
				
				if (res.data.code == 200) {
					this.dhListArrl = res.data.data.dh
					this.dgListArrl = res.data.data.gc
					this.dtListArrl = res.data.data.dt
					this.mbListArrl = res.data.data.mb
					this.sxListArrl = res.data.data.sx
					this.dzListArrl = res.data.data.dz
					this.lsListArrl = res.data.data.ls
					this.dlListArrl = res.data.data.dl
				}
				
			},
			
			//查看修改动火
			updataDongHuo(item) {
				var items = JSON.stringify(item)
				uni.navigateTo({
					url: './updataDongHuo?items=' + items
				})
			},
			updataDongTu(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataDongTu?items='+items
				})
			},
			updataDengGao(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataDengGao?items='+items
				})
			},
			updataDiaoZhuang(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataDianZhuang?items='+items
				})
			},
			updataDuanLu(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataDuanLu?items='+items
				})
			},
			updataLinshi(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataLinshiyongdian?items='+items
				})
			},
			updataMangBan(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataMangBan?items='+items
				})
			},
			updataShouXian(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataShouXian?items='+items
				})
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
					this.$set(this.csListArrl[index], 'right', 0);
				}
				var touch = e.touches[0];
				var item = this.csListArrl[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
					this.$set(this.csListArrl[e.currentTarget.dataset.index], 'right', disX);
				} else {
					this.$set(this.csListArrl[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//触摸滑动结束
			drawEnd(e) {
				console.log("滑动结束");
				var item = this.csListArrl[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.csListArrl[e.currentTarget.dataset.index], 'right', this.delBtnWidth);
				} else {
					this.$set(this.csListArrl[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//具体删除操作
			async delDatas() {
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/work/delDhInfo',
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
			delData(id) {
				var _this = this
				this.uuid = id
				console.log(this.uuid);
				uni.showModal({
					title: '提示',
					content: "确认删除？",
					success: function(res) {
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
