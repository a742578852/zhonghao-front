<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<!-- <view class="cu-form-group">
			<view class="title"><span class='star'>*</span>作业单位:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayBz" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.dlzyszdw}}</view>
			</picker>
		</view> -->
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">作业单位:</view>
			<view class="uni-input" style="">{{dataList.dlzyszdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm"></u-select>
		</view>
		<view class="cu-form-group">
			<view class="title">申请人:</view>
			<input placeholder="" name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">施工单位:</view>
			<input name="input" v-model="dataList.sgdw" :disabled="up" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>作业时间:</view>
			<input name="input" v-model="dataList.yjzysj" disabled="" @click="calendar"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">断路位置:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayBzs" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.dlzywzdw}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">断路详细位置:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayBzs" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.dlzywzqymc}}</view>
			</picker>
		</view>
		<view class="cu-form-group align-start">
			<view class="title"><span class='star'>*</span>断路作业内容:</view>
			<textarea maxlength="-1"  v-model='dataList.dlzywzjnr' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='dataList.bz' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">上传附件:</view>
			<image :src="imgUrl" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<!-- <button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="updataDl">确定</button> -->
		<view class="" style="display: flex;justify-content: space-around;margin-top: 30rpx;">
			<button type="primary" size="mini"  @click="up = false">修改</button>
			<button type="primary" size="mini"  @click="updataDl">确定</button>
		</view>
		<!-- <u-avatar class="img" :src="touxiang" ></u-avatar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				up:true,
				imgUrl:'',
				touxiang:'',
				mode:'date',
				show:false,
				bmshow:false,
				index:0,
				index1:0,
				index2:0,
				index3:0,
				arrayBz:['安全部','财务部'],
				arrayBzs:['安全部','财务部'],
				dataList:{
					docid:'',
					appid:'F330817DD1CA4065AC9D921347089221',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'断路作业登记',
					pribeanname:'com.ruoyi.aqgl.tszyzjy.models.Dlzyzjy',
					sgdw:'',
					dlzyjb:'',
					dlzyszdw:'',
					dlzyszdwid:'',
					dlzywzjnr:'',
					yjzysj:'',
					dlzywzdw:'安全部',
					dlzywzqymc:'安全部',
					bz:'',
					fj:'',
					
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./duanlu'
			})
			return true;
		},
		onShow() {
			this.arrayBz = uni.getStorageSync('arrayBz')
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		methods: {
			calendar(){
				if(!this.up){
					this.show = true
				}
			},
			//修改断路
			async updataDl(){
				//获取当前时间
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if(month < 10){
					month = '0' + month;
				}
				if(day < 10){
					day = '0' + day;
				}
				
				var time = year+'-' + month+'-' + day
				this.dataList.lastmodifiedtime = time
				var token = uni.getStorageSync('token')
				
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/work/updateDlInfo',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./duanlu'
					})
				}
			},
			//上传附件
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgUrl = res.tempFilePaths[0]
						console.log(this.imgUrl);
						// uni.setStorageSync('touxiang', this.imgUrl)
						this.touxiang = this.imgUrl
					}
				})
			},
			change(e){
				console.log(e.result);
				this.dataList.yjzysj = e.result
			},
			// bindPickerChange(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index = e.detail.value
			// 	this.dataList.dlzyszdw = this.arrayBz[this.index]
			// },
			confirm(e){
				this.dataList.dlzyszdw = e[e.length-1].label
				// this.bmid = e[e.length-1].extra
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.detail.value
				// this.dataList.dhzlx = this.index1
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.detail.value
				this.dataList.dlzywzdw = this.arrayBz[this.index2]
			},
			bindPickerChange3(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index3 = e.detail.value
				this.dataList.dlzywzqymc = this.arrayBz[this.index3]
			},
		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
</style>
