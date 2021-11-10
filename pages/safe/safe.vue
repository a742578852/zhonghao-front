<template>
	<view>
		<view class="swipers">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true">
				<swiper-item class="swiper-item">
					<image src="../../static/jpg1.jpg" mode=""></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/jpg2.jpg" mode=""></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/jpg3.jpg" mode=""></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/jpg4.jpg" mode=""></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/jpg5.jpg" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="deep">
			
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
			<!-- <view class="deep-items" @click="">
				<view class="deep-item" hover-class="swing3">
					<image class="deep-item-img" src="../../static/fxyp.png" mode=""></image>
				</view>
				<view class="">
					<text>任务统计</text>
				</view>
			</view> -->
			
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
				deptName:''
			}
		},
		onLoad() {

		},
		// async onShow() {
		// 	var token = uni.getStorageSync('token')
		// 	this.userName = uni.getStorageSync('admin').userName
			
		// 	console.log(token);
		// 	const res = await this.$myRequest({
		// 		method: 'POST',
		// 		url: 'api/home/homeInfo',

		// 	})
			
		// 	if (res.data.code == 205) {
		// 		uni.navigateTo({
		// 			url: '../login/login'
		// 		})
		// 	}
		// 	if (res.data.code == 200) {
		// 		this.deptName = res.data.data.dept.deptName
		// 		this.news = res.data.data.xinwen
		// 		this.notice = res.data.data.notice
		// 		this.dbrw = res.data.data.flowNodes.length
		// 		this.drzyp = res.data.data.workCount
		// 		this.yhzgz = res.data.data.ingDanger
		// 		this.cqwzg = res.data.data.overDanger
		// 		this.zdwxy = res.data.data.allCount
		// 	}


		// },
		methods: {
			// //新闻详情
			// updateNews(item){
			// 	var items = JSON.stringify(item)
			// 	uni.navigateTo({
			// 		url:'./updataNews?items='+items
			// 	})
			// },
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
			width: 25%;
			height: 180rpx;
			margin: 30rpx;
			border: solid 1rpx #C8C7CC;
			border-radius: 55%;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			line-height: 110rpx;

			.deep-item {
				font-size: 20rpx;
				margin-top: 30rpx;
				width: 72%;
				height: 120rpx;
				border-radius: 20rpx;
				display: flex;

				.deep-item-img {
					margin-left: 8rpx;
					margin-top: 5rpx;
					width: 110rpx;
					height: 110rpx;
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
</style>
