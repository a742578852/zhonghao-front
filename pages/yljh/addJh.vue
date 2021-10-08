<template>
	<view>
		<!-- <u-calendar v-model="show" :mode="mode" @change="change"></u-calendar> -->
		<!-- <view class="cu-form-group">
			<view class="title">组织单位:</view>
			<input name="input" v-model="dataList.zzdw" ></input>
		</view> -->
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">组织单位:</view>
			<view class="uni-input" style="">{{dataList.zzdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm"></u-select>
		</view>
		<view class="cu-form-group">
			<view class="title">演练项目:</view>
			<input name="input" v-model="dataList.ylxm" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">演练类别:</view>
			<input name="input" v-model="dataList.yllb" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">演练形式:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayYlxs" class="item2" style="">
				<view class="uni-input" style="">{{arrayYlxs[index]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">预计演练时间:</view>
			<input name="input" v-model="dataList.yjylsj"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">预计演练部位:</view>
			<input name="input" v-model="dataList.yjylbw" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">预计参演人员:</view>
			<input name="input" v-model="dataList.yjcyry" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">预计参演人数:</view>
			<input name="input" v-model="dataList.yjcyrs" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj" disabled=""></input>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="addJh">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bmshow:false,
				arrayBz:[],
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
		onShow() {
			this.arrayBz = uni.getStorageSync('arrayBz')
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
			
			this.dataList.createtime = time
		},
		methods: {
			async addJh(){
				this.dataList.docid = this.guid2()
				console.log(this.dataList.docid);
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/other/insertPlan',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./yljh'
					})
				}
			},
			//生成uuid
			guid2() {
			    function S4() {
			        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			    }
			    return (S4() + S4() +  S4() +  S4() +  S4() +  S4() + S4() + S4());
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
