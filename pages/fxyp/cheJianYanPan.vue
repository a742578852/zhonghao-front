<template>
	<view>
		<u-popup v-model="show" mode="center" width="90%" height="40%" border-radius="14">
			<view class="popup">
				<view class="popup-item">
					<text class="popup-item-text">车间名称：</text>
					<input class="popup-item-input" type="text" value="" />
				</view>
				
				<button type="primary" style="width: 50%;" @click="serach">确定</button>
			</view>
			
		</u-popup>
		<view class="content">
			<view class="content-item1">
				<text>车间研判列表</text>
			</view>
			<view class="content-item2">
				<view class="content-item2-son" @click="hzgs">
					<image class="content-item2-img" src="../../static/swsb.png" mode=""></image>
					<text>汇总到公司</text>
				</view>
				<!-- <view class="content-item2-son" @click="show = true">
					<image class="content-item2-img" src="../../static/cx.png" mode=""></image>
					<text>查询</text>
				</view> -->
				<!-- <view class="content-item2-son" @click="addBanzu">
					<image class="content-item2-img" src="../../static/xz.png" mode=""></image>
					<text style="">新增</text>
				</view> -->
			</view>
		</view>
		<view>
				<view class="contents" style="background-color: #bbfeff;font-size: 35rpx;">
					<view class="content-items" style="width: 20%;">
						<text></text>
					</view>
					<view class="content-items">
						<text>车间名称</text>
					</view>
					<view class="content-items" style="width: 40%;">
						<text>填报人</text>
					</view>
					<view class="content-items">
						<text>日期</text>
					</view>
				</view>
				<checkbox-group @change="checkboxChange" style="overflow: hidden;">
					<view class="contents" v-for="(item,index) in csListArrl" :data-index="index">
						<view class="content-items" style="width: 20%;">
							<checkbox :value="item.name"  :checked="item.checked" @click="tr(item,index)"/>
						</view>
						<view class="content-items" @click="updataChejian(item)">
							<text>{{item.cjmc}}</text>
						</view>
						<view class="content-items" style="width: 40%;" @click="updataChejian(item)">
							<text>{{item.authorname}}</text>
						</view>
						<view class="content-items" @click="updataChejian(item)">
							<text>{{item.sbsj}}</text>
						</view>
						<view class="remove" @click="delData(item)">删除</view>
					</view>
				 </checkbox-group>
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
				shanghua: '',
				checked:false,
				checked1:false,
				show: false,
				delBtnWidth: 100,
				docids:[],
				csListArrl:[],
				startX:'',
				huizong:{
					docid:'',
					appid:'F46F9C77933D46FFB305D5DAC5D30B5C',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'风险研判-车间级',
					pribeanname:'com.ruoyi.aqgl.fxgl.models.Fxypcjj',
					sczz:0,
					yx:0,
					tc:0,
					jx:0,
					tjdhzy:0,
					yjdhzy:0,
					ejdhzy:0,
					sxkjzy:0,
					gczy:0,
					qttszy:0,
					sfcyssc: "否",
					sfcyktc: "否",
					sfaqzt: "否"
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./fxyp'
			})
			return true;
		},
		onShow() {
			this.docids = []
			this.huizong.tjdhzy = 0
			this.huizong.yjdhzy = 0
			this.huizong.ejdhzy = 0
			this.huizong.sxkjzy = 0
			this.huizong.sczz = 0
			this.huizong.yx = 0
			this.huizong.tc = 0
			this.huizong.jx = 0
			this.huizong.gczy = 0
			this.huizong.qttszy = 0
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
			//汇总到公司
			async hzgs(){
				for(var i=0;i<this.csListArrl.length;i++){
					for(var j=0;j<this.docids.length;j++){
						if(this.csListArrl[i].docid == this.docids[j]){
							this.huizong.tjdhzy += parseInt(this.csListArrl[i].tjdhzy)
							this.huizong.yjdhzy += parseInt(this.csListArrl[i].yjdhzy)
							this.huizong.ejdhzy += parseInt(this.csListArrl[i].ejdhzy)
							this.huizong.sxkjzy += parseInt(this.csListArrl[i].sxkjzy)
							this.huizong.sczz += parseInt(this.csListArrl[i].sczz)
							this.huizong.yx += parseInt(this.csListArrl[i].yx)
							this.huizong.tc += parseInt(this.csListArrl[i].tc)
							this.huizong.jx += parseInt(this.csListArrl[i].jx)
							this.huizong.gczy += parseInt(this.csListArrl[i].gczy)
							this.huizong.qttszy += parseInt(this.csListArrl[i].qttszy)
							if(this.csListArrl[i].sfcyssc == '是'){
								this.huizong.sfcyssc = '是'
							}
							if(this.csListArrl[i].sfcyktc == '是'){
								this.huizong.sfcyktc = '是'
							}
							if(this.csListArrl[i].sfaqzt == '是'){
								this.huizong.sfaqzt = '是'
							}
						}
					}
				}
				var items = JSON.stringify(this.huizong)
				if(this.docids.length !=0){
					uni.navigateTo({
						url:'./addGs?items='+items
					})
				}else(
					uni.showToast({
						title: '请选择要汇总的班组'
					})
				)
			},
			//获取班组列表
			async getList() {
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/judge/getYpCjAll',
				})
				if (res.data.code == 200) {
					this.csListArrl = res.data.data
					for(var i=0;i<this.csListArrl.length;i++){
						this.csListArrl[i].name = this.csListArrl[i].docid
					}
				}
				if (this.csListArrl.length <= 8) {
					this.shanghua = ''
				}
			},
			tr(item){
				
				if(item.checked){
					this.docids.push(item.docid)
				}
				if(!item.checked){
					for(var i=0;i<this.docids.length;i++){
						if(this.docids[i]==item.docid){
							this.docids.splice(i,1)
						}
					}
				}
				console.log(this.docids.length);
			},
			 checkboxChange: function (e) {
			 		var items = this.csListArrl
			 		   var values = e.detail.value;
			 		for (var i = 0, lenI = items.length; i < lenI; ++i) {
			 			const item = items[i]
			 			if(values.includes(item.name)){
			 				this.$set(item,'checked',true)
			 			}else{
			 				this.$set(item,'checked',false)
			 			}
			 		}
			 	
			 },
			
			//查看/修改风险管控信息
			updataChejian(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataChejian?items='+items
				})
			},
			//显示查询页面
			serach(){
				this.show = false
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
			//删除方法
			delData(item){
				console.log("删除")
				uni.showModal({
				    title: '提示',
				    content: "确认删除？",
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
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
			width: 50%;
			height: 110rpx;
			display: flex;
			.content-item2-son {
				width: 40%;
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
		// .remove {
		// 	    width: 80px;
		// 	    height: 100%;
		// 		border-radius: 15rpx;
		// 	    background-color: red;
		// 	    color: white;
		// 	    position: absolute;
		// 	    top: 0;
		// 	    right: -90px;
		// 	    display: flex;
		// 	    justify-content: center;
		// 	    align-items: center;
		// 		font-size: 16px;
		// 	}
	}
	.contents {
		position: relative;
		width: 100%;
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;
		padding-top: 10rpx;
		background-color: #f3feff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.content-items {
			width: 30%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			white-space: pre-wrap;
	
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
