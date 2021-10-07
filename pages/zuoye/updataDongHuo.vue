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
			<picker @change="bindPickerChange1" :value="index1" :range="arraydhzlx">
				<view class="uni-input" style="">{{dataList.dhzyjb}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>作业所在单位:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{dataList.dhzyszdw}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">申请人:</view>
			<input placeholder="" name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">施工单位:</view>
			<input name="input" v-model="dataList.sgdw" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>作业时间:</view>
			<input name="input" v-model="dataList.yjzysj" disabled="" @click="show = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">动火位置:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{dataList.dhzywzdw}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">动火详细位置:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{dataList.dhzywzqymc}}</view>
			</picker>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">动火作业内容:</view>
			<textarea maxlength="-1"  v-model='dataList.dhzywzjnr'></textarea>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='dataList.bz'></textarea>
		</view>
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">上传附件:</view>
			<image :src="imgUrl" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="updataDh">确定</button>
		<!-- <u-avatar class="img" :src="touxiang" ></u-avatar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'',
				touxiang:'',
				mode:'date',
				show:false,
				arraydhzlx:['特殊动火作业证','一级动火作业证','二级动火作业证'],
				index:0,
				index1:0,
				index2:0,
				index3:0,
				arrayBz:['安全部','财务部'],
				dataList:{
					docid:'',
					appid:'242E465CAE6642689258471054D2A707',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'',
					createtime:'',
					lastmodifiedtime:'',
					appname:'动火作业登记',
					pribeanname:'com.ruoyi.aqgl.tszyzjy.models.Dhzyzjy',
					sqr:'',
					sgdw:'',
					dhzyjb:'',
					dhzyszdw:'',
					dhzyszdwid:'',
					dhzywzjnr:'',
					yjzysj:'',
					dhzywzdw:'',
					dhzywzqymc:'',
					bz:'',
					fj:'',
					dhzjb:'特殊动火作业证'
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./donghuo'
			})
			return true;
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		methods: {
			//修改动火
			async updataDh(){
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
					url: 'api/work/updateDhInfo',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./donghuo'
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
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.dhzyszdw = this.arrayBz[index]
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
				this.dataList.dhzywzdw = this.arrayBz[index2]
			},
			bindPickerChange3(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index3 = e.detail.value
				this.dataList.dhzywzqymc = this.arrayBz[this.index3]
			},
		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
</style>
