<template>
	<view class="">
		<u-popup v-model="show" mode="center" width="90%" height="30%" border-radius="14">
			<view class="popup">
				<view class="popup-item">
					<text class="popup-item-text">IP：</text>
					<input type="text" class="popup-item-input" v-model="ip" placeholder="请输入IP">
				</view>
				<view class="popup-item">
					<text class="popup-item-text">端口：</text>
					<input type="text" class="popup-item-input" v-model="port" placeholder="请输入端口号">
				</view>
			</view>
			<button type="primary" style="width: 50%;" @click="btn">确定</button>
		</u-popup>
		<view >
			<view style="padding-top:260rpx;">
				<view style="height:80px;">
					<view class="welcome">欢迎使用信息化平台</view>
					<view class="login-input" :class="{active:distinguish==true}">
						<image src="../../static/user.png"></image>
						<input type="text" placeholder="请输入当前账号" v-model="From.UserName"
							placeholder-style="color:#fff" />
					</view>
				</view>

				<view style="height:80px;">
					<view class="login-input" :class="{active:distinguish==true}">
						<image src="../../static/password.png"></image>
						<input type="test" placeholder="请输入当前密码" :password="showPassword" v-model="From.PassWord"
							placeholder-style="color:#fff" />

						<image src="../../static/yanjing.png" class="switch" @click="Switch()"></image>
					</view>
				</view>
			</view>

			<view class="login-button">
				<text class="register" @click="show = true">首次登录请设置IP</text>
				<button @click="login">点击登录</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				show1: true,
				From: {
					UserName: '', //账号
					PassWord: '', //密码
				},
				checked: false, //单选框
				distinguish: false,
				UserNametips: '',
				PassWordtips: '',
				showPassword: true,
				tx: '',
				ip: '',
				port: '',
				arrayBz:[],
				address: ''
			}
		},

		// 读取本地存储密码及账号
		onShow() {
			this.From.UserName = uni.getStorageSync('username')
			this.From.PassWord = uni.getStorageSync('password')
			this.ip = uni.getStorageSync('ip')
			this.port = uni.getStorageSync('port')
		},
		onBackPress(options) {
			return true;
		},
		methods: {

			/* 
			登录逻辑部分
			 */
			async login() {
				
				var that = this
				var address = uni.getStorageSync('address')

				if (address != '') {
					if (that.From.UserName == '') {
						uni.showToast({
							title: '请填写用户名'
						})
						that.UserNametips = '请输入用户名'
					} else if (that.From.PassWord == '') {
						uni.showToast({
							title: '请输入密码'
						})
						that.PassWordtips = '请输入密码'
					} else {
						const res = await this.$myRequest({
							url: '/login/goLogin',
							method: 'POST',
							data: {
								address: address,
								username: that.From.UserName,
								password: that.From.PassWord
							}
						})
						console.log(res.data.data);
						if (res.data.code == 200) {
							uni.setStorageSync('admin', res.data.data.admin)
							uni.setStorageSync('token', res.data.data.token)
							uni.setStorageSync('username', that.From.UserName)
							uni.setStorageSync('password', that.From.PassWord)
							console.log(res.data.data.token);
							
							uni.switchTab({
								url: '../index/index'
							})
							
							const dept = await this.$myRequest({
								method: 'POST',
								url: 'api/other/getAllDept',
							})
							// this.arrayBz = dept.data.data
							uni.setStorageSync('arrayBz', dept.data.data)
						} else {
							uni.showToast({
								title: '用户名或密码错误'
							})
						}
					}
				} else {
					uni.showToast({
						title: '请先设置IP'
					})
				}

			},
			

			async btn() {
				uni.setStorageSync('ip', this.ip)
				uni.setStorageSync('port', this.port)

				if ((this.ip.trim() != '') && (this.port.trim() != '')) {
					this.address = this.ip + ':' + this.port

					const res = await this.$myRequest({
						method: 'POST',
						url: '/login/testConnection',
						data: {
							address: this.address
						}
					})
					console.log(this.address);
					console.log(res);
					if (res.data.code == 200) {

						uni.setStorageSync('address', this.address)
						this.show = false
					}else{
						uni.showToast({
							title: '请填写正确的IP和端口号'
						})
					}
				} else {
					uni.showToast({
						title: '请填写IP和端口号'
					})
				}
			},
			/* 记住密码用户第二次进入页面直接填充 */
			clickchecked() {
				var that = this
				this.checked = !this.checked
				if (that.checked == true) {
					if (that.From.UserName && that.From.PassWord) {
						uni.setStorage({
							key: 'UserInfo',
							data: that.From
						})
					}
				}
			},
			// Delete(){
			// 	this.From.UserName = ""
			// },
			// Delete2(){
			// 	this.From.PassWord = ""
			// },

			Switch() {
				this.showPassword = !this.showPassword
			}
		}
	}
</script>

<style lang="less">
	/* 背景图设置 */
	page {
		width: 100%;
		height: 100%;
		background-image: url(../../static/index1.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
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
	.login-input {
		width: 85%;
		height: 47px;
		margin: 0px auto;
		border-bottom: 1px solid rgb(255, 255, 255);
		display: flex;

		input {
			width: 91%;
			border: none;
			height: 20px;
			color: rgb(255, 255, 255);
			padding-left: 15px;
			padding-right: 15px;
			font-size: 14px;
			margin-top: 27px;
			outline: none;
			-webkit-appearance: none;
			/*去除系统默认的样式*/
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			/* 点击高亮的颜色*/
		}

		image {
			width: 23px;
			height: 20px;
			margin-top: 25px;

		}

		// .delete{
		// 	width:20px;
		// 	height:20px;
		// 	margin-left:-20px;
		// }
		.switch {
			width: 23px;
			height: 14px;
			padding-top: 3px;
		}
	}

	.login-button {
		width: 85%;
		margin: 0px auto;

		button {
			width: 100%;
			font-size: 15px;
			height: 40px;
			color: rgb(255, 255, 255);
			background-color: rgb(78, 110, 242);
			margin-top: 16px;
		}

		.register {
			font-size: 16px;
			color: white;
			float: right;
			padding-top: 2px;
			padding-bottom: 5px;
			text-decoration: underline;

		}

	}

	.active {
		color: rgb(245, 8, 8);
		border-bottom: 1px solid rgb(245, 8, 8);
	}

	.tips {
		color: rgb(245, 8, 8);
		font-size: 12px;
		display: initial;
		float: right;
		padding-right: 30px;
	}

	.welcome {
		font-size: 20px;
		color: white;
		text-align: center;

	}

	#setIp {
		margin-top: 100px;

	}

	.setIp {
		text-align: center;
		font-size: 20px;
	}

	/* #ifdef APP-PLUS */
	.ipDddress {
		font-size: 18px;
		position: absolute;
		top: 145px;
		left: 15px;
	}

	.ipPort {
		font-size: 18px;
		position: absolute;
		top: 185px;
		left: 15px;
	}

	/* #endif */

	/* 运行在H5 */
	/* #ifdef H5 */
	.ipDddress {
		font-size: 18px;
		position: absolute;
		top: 48px;
		left: 15px;
	}

	.ipPort {
		font-size: 18px;
		position: absolute;
		top: 90px;
		left: 15px;
	}

	/* #endif */
	.ip {
		width: 65%;
		height: 47px;
		margin: 0px auto;
		border-bottom: 1px solid;
		display: flex;
	}

	.port {
		width: 65%;
		height: 47px;
		margin: 0px auto;
		border-bottom: 1px solid;
		display: flex;
	}

	.btn {
		width: 60%;
		background-color: #007AFF;
		margin-top: 20px;
	}
</style>
