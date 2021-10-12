<template>
	<view>
		<view class="swipers">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true">
				<swiper-item class="swiper-item" v-for="item in img">
					<image :src="item" mode=""></image>
				</swiper-item>
				<!-- <swiper-item class="swiper-item">
					<image src="../../static/jpg2.jpg" mode=""></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/jpg1.jpg" mode=""></image>
				</swiper-item> -->
			</swiper>
		</view>
		<view class="content">
			<view class="content-item" @click="toFxgk">
				<view class="content-item-son" hover-class="swing">
					<image class="img" src="../../static/fxgk.png" mode=""></image>
					<text>风险管控</text>
				</view>
			</view>
			<view class="content-item" @click="toZuoye">
				<view class="content-item-son" hover-class="swing">
					<image class="img" src="../../static/zysq.png" mode=""></image>
					<text>作业申请</text>
				</view>
			</view>
			<view class="content-item" @click="toYihuan">
				<view class="content-item-son" hover-class="swing">
					<image class="img" src="../../static/yhzg.png" mode=""></image>
					<text>隐患整改</text>
				</view>
			</view>
			<view class="content-item" @click="toSanwei">
				<view class="content-item-son" hover-class="swing">
					<image class="img" src="../../static/swsb.png" mode=""></image>
					<text>三违上报</text>
				</view>
			</view>
		</view>
		<view class="mid">
			<view class="mid1">
				<image class="imgRy" src="../../static/rytx.png" mode=""></image>
				<text>{{userName}}</text>
				<text>{{deptName}}</text>
			</view>
		</view>
		<view class="mid" @click="toDb">
			<view class="mid1">
				<image class="imgRy" src="../../static/dbrw.png" mode=""></image>
				<text>待办任务：</text>
				<text>{{dbrw}}条</text>
			</view>
		</view>
		<view class="mid" @click="toGr">
			<view class="mid1">
				<image class="imgRy" src="../../static/grrw.png" mode=""></image>
				<text>个人任务：</text>
				<text>{{dbrw}}条</text>
			</view>
		</view>
		<view class="mids">
			<view class="mids-item" hover-class="swing1" @click="toDrzy">
				<text>当日作业票：{{drzyp}}</text>
			</view>
			<view class="mids-item" hover-class="swing1" @click="toYhzgz">
				<text>隐患整改中：{{yhzgz}}</text>
			</view>
			<view class="mids-item" hover-class="swing1" @click="toCq">
				<text>超期未整改：{{cqwzg}}</text>
			</view>
			<view class="mids-item">
				<text>重大危险源：{{zdwxy}}</text>
			</view>
		</view>
		
		<view class="mids1">
			<view class="mids1-item" hover-class="swing2" @click="toYdqt">
				<text>有毒气体</text>
			</view>
			<view class="mids1-item" hover-class="swing2" @click="toKrqt">
				<text>可燃气体</text>
			</view>
			<view class="mids1-item" hover-class="swing2" @click="toYwjk">
				<text>液位监控</text>
			</view>
			<view class="mids1-item" hover-class="swing2" @click="toWdjk">
				<text>温度监控</text>
			</view>
			<view class="mids1-item" hover-class="swing2" @click="toYljk">
				<text>压力监控</text>
			</view>
		</view>
		<view class="deep">
			<!-- <view class="deep-items">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/jcd.png"  mode=""></image>
				</view>
				<view class="">
					<text>检查单</text>
				</view>
			</view> -->
			<view class="deep-items" @click="toNews">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/aqxw.png" mode=""></image>
				</view>
				<view class="">
					<text>安全新闻</text>
				</view>
			</view>
			<view class="deep-items" @click="toGuiCheng">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/czgc.png" mode=""></image>
				</view>
				<view class="">
					<text>操作规程</text>
				</view>
			</view>
			<view class="deep-items" @click="toYljh">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/yljh.png" mode=""></image>
				</view>
				<view class="">
					<text>演练计划</text>
				</view>
			</view>
			<view class="deep-items" @click="toPxzl">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/zxxx.png" mode=""></image>
				</view>
				<view class="">
					<text>培训资料</text>
				</view>
			</view>
			<view class="deep-items" @click="toAzw">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/azw.png" mode=""></image>
				</view>
				<view class="">
					<text>安字文</text>
				</view>
			</view>
			<view class="deep-items" @click="toFxyp">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/fxyp.png" mode=""></image>
				</view>
				<view class="">
					<text>风险研判</text>
				</view>
			</view>
			<view class="deep-items" @click="toGd">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/gd.png" mode=""></image>
				</view>
				<view class="">
					<text>更多操作</text>
				</view>
			</view>
		</view>
		<view class="deeps">
			<text @click="dianji(0)" :class="{changeColor1: this.bian1==1}">通知公告</text>
			
			<text @click="dianji(1)" :class="{changeColor1: this.bian2==1}">安全新闻</text>
		</view>
		<view class="deeps1" v-for="(item,index) in news" v-if="!show" @click="toNews()">
			<view class="deeps1-item" hover-class="swing4">
				<text>{{item.bt}}</text>
			</view>
		</view>
		<view class="deeps1" v-for="(item,index) in notice" v-if="show" @click="toGg()">
			<view class="deeps1-item" hover-class="swing4">
				<text>{{item.bt}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:true,
				news: [],
				notice:[],
				dbrw:'',
				drzyp:'',
				yhzgz:'',
				cqwzg:'',
				zdwxy:'',
				userName:'',
				deptName:'',
				bian1: '1',
				bian2: '0',
				img:[]
			}
		},
		onLoad() {

		},
		async onShow() {
			var token = uni.getStorageSync('token')
			this.userName = uni.getStorageSync('admin').userName
			
			console.log(token);
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/home/homeInfo',

			})
			console.log(res);
			if (res.data.code == 205) {
				uni.navigateTo({
					url: '../login/login'
				})
			}
			if (res.data.code == 200) {
				this.deptName = res.data.data.dept.deptName
				this.news = res.data.data.xinwen
				this.notice = res.data.data.notice
				this.dbrw = res.data.data.flowNodes.length
				this.drzyp = res.data.data.workCount
				this.yhzgz = res.data.data.ingDanger
				this.cqwzg = res.data.data.overDanger
				this.zdwxy = res.data.data.allCount
				this.img = res.data.data.banners
				console.log(this.img);
			}


		},
		methods: {
			dianji(e) {
				if (e == 0) {
					this.bian1 = 1
					this.bian2 = 0
					this.show = true
					
				} else {
					this.bian1 = 0
					this.bian2 = 1
					this.show = false
				}
			
			
			},
			//新闻详情
			updateNews(item){
				var items = JSON.stringify(item)
				uni.navigateTo({
					url:'./updataNews?items='+items
				})
			},
			//风险管控
			toFxgk() {
				uni.navigateTo({
					url: '../fxgk/fxgk'
				})
			},
			//作业证
			toZuoye() {
				uni.navigateTo({
					url: '../zuoye/zuoye'
				})
			},
			//隐患整改
			toYihuan() {
				uni.navigateTo({
					url: '../yhzg/yhzg'
				})
			},
			//三违上报
			toSanwei() {
				uni.navigateTo({
					url: '../swsb/swsb'
				})
			},
			//当日作业
			toDrzy() {
				uni.navigateTo({
					url: '../zuoye/dangrizuoye'
				})
			},
			//隐患整改中
			toYhzgz() {
				uni.navigateTo({
					url: '../yhzg/yhzgz'
				})
			},
			toCq(){
				uni.navigateTo({
					url: '../yhzg/chaoqi'
				})
			},
			//有毒气体
			toYdqt() {
				uni.navigateTo({
					url: '../zhongdawxy/ydqt'
				})
			},
			//可燃气体
			toKrqt() {
				uni.navigateTo({
					url: '../zhongdawxy/krqt'
				})
			},
			//液位监控
			toYwjk() {
				uni.navigateTo({
					url: '../zhongdawxy/ywjc'
				})
			},
			//温度监控
			toWdjk() {
				uni.navigateTo({
					url: '../zhongdawxy/wdjc'
				})
			},
			//压力监控
			toYljk() {
				uni.navigateTo({
					url: '../zhongdawxy/yljc'
				})
			},
			//安全新闻
			toNews() {
				uni.navigateTo({
					url: '../news/news'
				})
			},
			//安全公告
			toGg(){
				uni.navigateTo({
					url: '../news/gonggao'
				})
			},
			//操作规程
			toGuiCheng() {
				uni.navigateTo({
					url: '../caoZuoGuiCheng/caoZuoGuiCheng'
				})
			},
			//演练计划
			toYljh() {
				uni.navigateTo({
					url: '../yljh/yljh'
				})
			},
			//培训资料
			toPxzl() {
				uni.navigateTo({
					url: '../pxzl/pxzl'
				})
			},
			//安字文
			toAzw() {
				uni.navigateTo({
					url: '../azw/azw'
				})
			},
			//风险研判
			toFxyp() {
				uni.navigateTo({
					url: '../fxyp/fxyp'
				})
			},
			//更多
			toGd(){
				uni.switchTab({
					url:'../safe/safe'
				})
			},
			toDb(){
				uni.navigateTo({
					url: '../waittask/waitTask'
				})
			},
			toGr(){
				
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		width: 99.3%;
		height: 400rpx;

		// border: solid 1rpx red;
		.content-item {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 10upx;
			width: 45%;
			height: 180rpx;
			// border: solid 1rpx red;
			border-radius: 20rpx;
			background-color: #e4fffb;

			.content-item-son {
				border-radius: 20rpx;
				margin: 15rpx;
				// margin-left: 26rpx;
				background-color: #FFFFFF;
				width: 85%;
				height: 150upx;
				// border: solid 1rpx red;
				font-size: 40upx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.img {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.swing {
				animation: move 3s 0s infinite;
				-webkit-animation: move 3s 0s infinite;
				transform-origin: top;
				-webkit-transform-origin: center;
				height: 85%;
				width: 400rpx;
			}
		}
	}

	.mid {
		width: 95%;
		height: 160rpx;
		margin-top: 15rpx;
		margin-left: 2.3%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 20rpx;
		font-size: 40rpx;
		background-color: #e4fffb;

		.mid1 {
			width: 95%;
			height: 120rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-radius: 20rpx;
			background-color: #FFFFFF;
		}

		.imgRy {
			width: 100rpx;
			height: 100rpx;
		}

	}

	.mids {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		width: 95%;
		height: 180rpx;
		margin-top: 15rpx;
		margin-left: 2.3%;

		.mids-item {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 45%;
			height: 80rpx;
			border-radius: 20rpx;
			background-color: #63fd60;
		}

		.swing1 {
			background-color: #f0dc42;
		}
	}

	.mids1 {
		width: 95%;
		height: 110rpx;
		margin-top: 10rpx;
		margin-left: 2.3%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 20rpx;

		.mids1-item {
			font-size: 30rpx;
			color: #fff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 19%;
			height: 80rpx;
			border-radius: 20rpx;
			background-color: #7b7dfc;
		}

		.swing2 {
			background-color: #6ee2e8;
		}
	}

	.deep {
		width: 99.3%;
		height: 450rpx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.deep-items {
			width: 19%;
			height: 135rpx;
			margin: 8rpx;
			border: solid 1rpx #C8C7CC;
			border-radius: 55%;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			line-height: 110rpx;

			.deep-item {
				font-size: 20rpx;
				margin-top: 13rpx;
				width: 72%;
				height: 110rpx;
				border-radius: 20rpx;
				display: flex;

				.deep-item-img {
					margin-left: 2rpx;
					margin-top: 5rpx;
					width: 96rpx;
					height: 96rpx;
				}

			}

			.swing3 {
				background-color: #55ffff;
			}
		}
	}

	.deeps {
		width: 95%;
		height: 120rpx;
		margin-left: 2.5%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 45rpx;
		background-color: #ebeaef;
		border-radius: 20rpx;
	}

	.deeps1 {
		width: 95%;
		height: 100%;
		margin-left: 2.5%;

		font-size: 40rpx;

		.deeps1-item {
			padding: 20rpx;
			border-bottom: solid 1rpx #ebeaef;
		}

		.swing4 {
			background-color: #d9d9d9;
		}
	}

	.swipers {
		// background-color: #D2F1F0;
		width: 750rpx;
		height: 330rpx;

		image {
			height: 100%;
			width: 100%;
		}
	}
	.changeColor1 {
		// background-color: #4a5cd0;
		color: #4a5cd0;
	}
</style>
