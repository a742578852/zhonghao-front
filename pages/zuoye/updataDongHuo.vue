<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<!-- <view class="cu-form-group">
			<view class="title"><span class='star'>*</span>动火证级别:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arraydhzlx">
				<view class="uni-input" style="">{{arraydhzlx[index1]}}</view>
			</picker>
		</view> -->
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>动火证级别:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arraydhzlx" :disabled="up">
				<view class="uni-input" style="">{{dataList.dhzyjb}}</view>
			</picker>
		</view>
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">作业单位:</view>
			<view class="uni-input" style="">{{dataList.dhzyszdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm"></u-select>
		</view>
		<view class="cu-form-group">
			<view class="title">申请人:</view>
			<input placeholder="" name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">施工单位:</view>
			<input name="input" v-model="dataList.sgdw" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>作业时间:</view>
			<input name="input" v-model="dataList.yjzysj" disabled="" @click="calendar"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">动火位置:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayArea1" class="item2" style=""
				:disabled="up">
				<view class="uni-input" style="">{{dataList.dhzywzdw}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">动火详细位置:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayArea2" class="item2" style=""
				:disabled="up">
				<view class="uni-input" style="">{{dataList.dhzywzqymc}}</view>
			</picker>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">动火作业内容:</view>
			<textarea maxlength="-1" v-model='dataList.dhzywzjnr' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1" v-model='dataList.bz' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">上传附件:</view>
			<view>点击上传</view>
		</view>
		<view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChange" :value="fjindex" :range="fj">
				<view class="uni-input">{{fj[fjindex]}}</view>
			</picker>
		</view>

		<view class="" style="display: flex;justify-content: space-around;margin-top: 30rpx;margin-bottom: 30rpx;">
			<button type="primary" size="mini" @click="up = false" :disabled="!up">修改</button>
			<button type="primary" size="mini" @click="updataDh">确定</button>
		</view>
		<!-- <u-avatar class="img" :src="touxiang" ></u-avatar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fj:[],
				fjs:[],
				bmshow: false,
				up: true,
				imgUrl: '',
				touxiang: '',
				mode: 'date',
				show: false,
				arraydhzlx: ['特殊动火作业证', '一级动火作业证', '二级动火作业证'],
				fjindex:0,
				index: 0,
				index1: 0,
				index2: 0,
				index3: 0,
				arrayBz: ['安全部', '财务部'],

				arrayArea1: [],
				arrayArea2: [],
				areas: [],
				did: '',
				dataList: {
					docid: '',
					appid: '242E465CAE6642689258471054D2A707',
					authorid: '',
					authorname: '',
					authororgid: '',
					authororgname: '',
					createtime: '',
					lastmodifiedtime: '',
					appname: '动火作业登记',
					pribeanname: 'com.ruoyi.aqgl.tszyzjy.models.Dhzyzjy',
					sqr: '',
					sgdw: '',
					dhzyjb: '',
					dhzyszdw: '',
					dhzyszdwid: '',
					dhzywzjnr: '',
					yjzysj: '',
					dhzywzdw: '安全部',
					dhzywzqymc: '安全部',
					bz: '',
					fj: '',
					dhzjb: '特殊动火作业证'
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url: './donghuo'
			})
			return true;
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)

			this.dataList.createtime = this.dataList.createtime.substring(0, 10)
		},
		async onShow() {
			//获取所有区域对象
			this.areas = uni.getStorageSync('areas')
			this.getArea2()
			//从缓存获取所有一级区域
			this.arrayArea1 = uni.getStorageSync('arrayArea')
			this.arrayBz = uni.getStorageSync('arrayBz')
			//获取附件列表
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getFile',
				data:{docid:this.dataList.docid}
			})
			for(var i = 0;i<res.data.data.length;i++){
				this.fj.push(res.data.data[i].sfilename)
			
			}
			this.fjs = res.data.data
			
		
		},
		methods: {
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为1111', e.target.value)
			            this.fjindex = e.target.value
						console.log(this.fjindex);
						var path = 'http://124.70.192.154:7703/img/'+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid
						console.log(path);
						plus.runtime.openURL(path);
						// plus.runtime.openURL("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent(path));
						// window.open("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent(path));
						
			        },
			//获取二级区域
			async getArea2() {

				for (var i = 0; i < this.areas.length; i++) {
					if (this.dataList.dhzywzdw == this.areas[i].dw) {
						this.did = this.areas[i].docid
						break
					}
				}
				const area = await this.$myRequest({
					method: 'POST',
					url: 'api/other/getTwoArea',
					data: {
						docid: this.did
					}
				})
				if (area.data.code == 200) {
					this.arrayArea2 = []
					for (var i = 0; i < area.data.data.length; i++) {
						this.arrayArea2.push(area.data.data[i].qymc + '---' + area.data.data[i].zrr)
					}

					// this.dataList.dhzywzqymc = this.arrayArea2[0]
				}
			},
			calendar() {
				if (!this.up) {
					this.show = true
				}
			},
			//修改动火
			async updataDh() {
				//获取当前时间
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (month < 10) {
					month = '0' + month;
				}
				if (day < 10) {
					day = '0' + day;
				}

				var time = year + '-' + month + '-' + day
				this.dataList.lastmodifiedtime = time
				var token = uni.getStorageSync('token')

				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/work/updateDhInfo',
					header: {
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)

				})
				
				if (res.data.code == 200) {
					uni.navigateTo({
						url: './donghuo'
					})
				}else{
					uni.showToast({
						title:res.data.message
					})
				}
			},
			//上传附件
			chooseImage() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://124.70.192.154:7702/api/other/uploadFile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'files',
							formData: {
								'docid': this.dataList.docid,
								'appid': this.dataList.appid,
								'type': 'fileinput-dhzyfj'
							},
							header: {
								'token': uni.getStorageSync("token")
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				})
			},
			change(e) {
				console.log(e.result);
				this.dataList.yjzysj = e.result
			},
			// bindPickerChange(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index = e.detail.value
			// 	this.dataList.dhzyszdw = this.arrayBz[index]
			// },
			confirm(e) {
				this.dataList.dhzyszdw = e[e.length - 1].label
				// this.bmid = e[e.length-1].extra
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.detail.value
				this.dataList.dhzyjb = this.arraydhzlx[this.index1]
				// this.dataList.dhzlx = this.index1
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.detail.value
				this.dataList.dhzywzdw = this.arrayArea1[this.index2]
				this.getArea2()
			},
			bindPickerChange3(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index3 = e.detail.value
				this.dataList.dhzywzqymc = this.arrayArea2[this.index3]
			},
		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
</style>
