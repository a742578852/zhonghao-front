<template>
	<view>
		<u-popup v-model="show" mode="center" width="90%" height="48%" border-radius="14">
			<view class="popup">
				<view class="popup-item">
					<text class="popup-item-text">隐患问题描述：</text>
					<input class="popup-item-input" type="text" v-model="bhgys" />
				</view>
				<view class="popup-item">
					<text class="popup-item-text">责任部门：</text>
					<input class="popup-item-input" type="text" v-model="zrbm" />
				</view>
				<view class="popup-item">
					<text class="popup-item-text">隐患等级：</text>
					<input class="popup-item-input" type="text" v-model="yhdj" />
				</view>
				<view class="popup-item">
					<text class="popup-item-text">隐患类型：</text>
					<input class="popup-item-input" type="text" v-model="yhlx" />
				</view>
				<view class="popup-item">
					<text class="popup-item-text">发起人：</text>
					<input class="popup-item-input" type="text" v-model="fqr" />
				</view>
				<button type="primary" size="mini" style="width: 50%;margin-left: 25%;margin-top: 30rpx;" @click="serach">确定</button>
			</view>
			
		</u-popup>
		<view class="content">
			<view class="content-item1">
				<text>隐患整改列表</text>
			</view>
			<view class="content-item2">
				<view class="content-item2-son" @click="show = true">
					<image class="content-item2-img" src="../../static/cx.png" mode=""></image>
					<text>查询</text>
				</view>
				<view class="content-item2-son" @click="addYhzg">
					<image class="content-item2-img" src="../../static/xz.png" mode=""></image>
					<text>新增</text>
				</view>
			</view>
		</view>
		<view class="" style="overflow: hidden;">
			<view class="mid" hover-class="mid-hover" :data-index="index" v-for="(item,index) in csListArrl" v-if="index <= count" @touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd" :style="'right:'+item.right+'px'">
				<view class="mid-item1" @click="updateYhzg(item)">
					<text style="width: 65%;">{{item.zgdbh}}</text>
					<text>{{item.authorname}}</text>
				</view>
				<view class="mid-item2" @click="updateYhzg(item)">
					<text>{{item.yhxxjcrq}}</text>
				</view>
				<view class="mid-item3" @click="updateYhzg(item)">
					<input type="text" v-model="item.bhgys" maxlength="16" disabled=""/>
				</view>
				<view class="remove" @click="delData(item.docid)">删除</view>
			</view>
			<view class=""
				style="width: 98%;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;height: 50rpx;">
				<text>{{shanghua}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bhgys:'',//不合格因素
				yhdj:'',//隐患等级
				yhlx:'',//隐患类型
				zrbm:'',//责任部门
				fqr:'',//发起人
				show: false,
				delBtnWidth: 100,
				shanghua: '加载更多',
				count: 8,
				uuid: '',
				csListArrl:[],
				startX:'',
				
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'yhfj'
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
				
					_this.count += 8
				 
				 if(_this.count >= _this.csListArrl.length){
					_this.shanghua = '到底了'
				}
		
			}, 1000);
		
		},
		methods: {
			//获取隐患列表
			async getList() {
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/getDangerList',
					data:{
						'type':0
					}
				})
				if (res.data.code == 200) {
					this.csListArrl = res.data.data
				}
				if (this.csListArrl.length <= 8) {
					this.shanghua = ''
				}
			},
			//新增隐患整改
			addYhzg(){
				uni.setStorageSync('jcjb',0)
				uni.navigateTo({
					url:'./addYhzg'
				})
			},
			//查看/修改风险管控信息
			updateYhzg(item){
				
				          var items = JSON.stringify(item)
				          uni.navigateTo({
				          	url:'./updataYhzg?items='+items
				          })
				     
				
			},
			//显示查询页面
			async serach(){
				this.show = false
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/getDangerList',
					data:{
						'type':0,
						'bhgys':this.bhgys,
						'yhdj':this.yhdj,
						'yhlx':this.yhlx,
						'zrbm':this.zrbm,
						'fqr':this.fqr
					}
				})
				console.log(JSON.stringify(res));
				if (res.data.code == 200) {
					this.csListArrl = res.data.data
				}
				if (this.csListArrl.length <= 8) {
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
					url: 'api/danger/delDanger',
					data: {
						docid: this.uuid
					}
				})
				console.log(res);
				if (res.data.code == 200) {
					uni.startPullDownRefresh();
				}else{
					uni.showToast({
						title: res.data.message
					})
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
