<template>
	<view>
		<!-- <u-calendar v-model="show" :mode="mode" @change="change"></u-calendar> -->
		<!-- <view class="cu-form-group">
			<view class="title">组织单位:</view>
			<input name="input" v-model="dataList.zzdw" :disabled="up"></input>
		</view> -->
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">组织单位:</view>
			<view class="uni-input" style="">{{dataList.zzdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm"></u-select>
		</view>
		<view class="cu-form-group">
			<view class="title">演练项目:</view>
			<input name="input" v-model="dataList.ylxm" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">演练类别:</view>
			<input name="input" v-model="dataList.yllb" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">演练形式:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayYlxs" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.ylxs}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">预计演练时间:</view>
			<input name="input" v-model="dataList.yjylsj" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">预计演练部位:</view>
			<input name="input" v-model="dataList.yjylbw" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">预计参演人员:</view>
			<input name="input" v-model="dataList.yjcyry" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">预计参演人数:</view>
			<input name="input" v-model="dataList.yjcyrs" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj" disabled=""></input>
		</view>
		
		<view class="" style="display: flex;justify-content: space-around;margin-top: 50rpx;">
			<button type="primary" size="mini"  @click="up = false" :disabled="!up">修改</button>
			<button type="primary" size="mini"  @click="updataJh">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bmshow:false,
				arrayBz:[],
				up:true,
				show:false,
				mode:'date',
				index:0,
				zzdw:'',
				ylxm:'',
				yllb:'',
				ylsj:'',
				ylbw:'',
				ylry:'',
				ylrs:'',
				fj:'',
				arrayYlxs:['桌面','现场'],
				dataList:{
					docid:'',
					appid:'041A3BEE58B24961A5294B64B53A6F29',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'演练计划登记',
					pribeanname:'com.ruoyi.aqgl.tzzl.Yjyljh',
					zzdw:'',
					ylxm:'',
					yllb:'',
					ylxs:'桌面',
					yjylsj:'',
					yjylbw:'',
					yjcyry:'',
					yjcyrs:''
				}
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		onShow() {
			this.arrayBz = uni.getStorageSync('arrayBz')
		},
		methods: {
			//修改计划
			async updataJh(){
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
					url: 'api/other/updatePlan',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./yljh'
					})
				}
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.ylxs = this.arrayYlxs[this.index]
			},
			confirm(e){
				this.dataList.zzdw = e[e.length-1].label
				// this.bmid = e[e.length-1].extra
			},
			change(e){
				console.log(e.result);
				this.ylsj = e.result
			},
		}
	}
</script>

<style>

</style>
