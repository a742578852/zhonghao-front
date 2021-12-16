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
					<image src="../../static/jpg1.jpg" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="content" >
			<image class="img" src="../../static/touxiang.png" mode=""></image>
			<view class="content-item">
				<view class="">{{username}}</view>
				<view class="">Id:{{userid}}</view>
			</view>
		</view>
		<view class="content" hover-class="change" @click="back">
			<image class="img" src="../../static/tuichu.png" mode=""></image>
			<view class="content-item">
				<view class="">退出登录</view>
			</view>
		</view>
		<view class="content" hover-class="change" @click="check">
			<image class="img" src="../../static/gengxin.png" mode=""></image>
			<view class="content-item">
				<view class="" >检查更新</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonUrl from '../../util/util.js'
	export default {
		data() {
			return {
				username:'',
				userid:''
			}
		},
		onShow() {
			this.username = uni.getStorageSync('admin').userName
			this.userid = uni.getStorageSync('admin').userId
		},
		methods: {
			back(){
				uni.removeStorageSync('token')
				uni.navigateTo({
					url:'../login/login'
				})
			},
			//检查更新
			async check(){
				console.log(commonUrl.downloadUrl);
				var _this = this;
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/other/getAppVersion',
				})
				if(res.data.code == 200){
					
					plus.runtime.getProperty(plus.runtime.appid, function(inf) {
						console.log(inf.version);
						console.log(res.data.data);
						if(inf.version != res.data.data.versionName){
						    uni.showModal({
						        title: "发现新版本",
						        content: "确认下载更新",
						        success: (res) => {
						            if (res.confirm == true) {//当用户确定更新，执行更新
						                _this.doUpData();
						            }
						        }
						    })
						}
					})
				}
			},
			//更新方法
			doUpData() {
			    uni.showLoading({
			        title: '更新中……'
			    })
			    uni.downloadFile({//执行下载
			        // url: 'http://60.2.203.162:7703/download/zh.apk', //下载地址
					url:commonUrl.downloadUrl,
			        success: downloadResult => {//下载成功
			            uni.hideLoading();
			            if (downloadResult.statusCode == 200) {
			                uni.showModal({
			                    title: '',
			                    content: '更新成功，确定现在重启吗？',
			                    confirmText: '重启',
			                    confirmColor: '#EE8F57',
			                    success: function(res) {
			                        if (res.confirm == true) {
			                            plus.runtime.install(//安装
			                                downloadResult.tempFilePath, {
			                                    force: true
			                                },
			                                function(res) {
			                                    utils.showToast('更新成功，重启中');
			                                    plus.runtime.restart();
			                                }
			                            );
			                        }
			                    }
			                });
			            }
			        }
			    });
			}
		}
	}
</script>

<style lang="scss">
	.swipers {
		// background-color: #D2F1F0;
		width: 750rpx;
		height: 330rpx;
	
		image {
			height: 100%;
			width: 100%;
		}
	}
	.content {
		width: 96%;
		height: 100rpx;
		margin-left: 2%;
		padding-left: 10rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		.content-item {
			font-size: 30rpx;
			margin-left: 50rpx;
		}
		.img {
			width: 90rpx;
			height: 90rpx;
		}
	}
	.change {
		background-color: #75b1ff;
	}
</style>
