<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">填报人:</view>
			<input name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报部门:</view>
			<input name="input" v-model="dataList.authororgname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.sbsj" disabled="" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">车间名称:</view>
			<input name="input" v-model="dataList.cjmc" disabled=""></input>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;font-size: 40rpx;">
			<text>车间状态</text>
		</view>
		<view class="cu-form-group">
			<view class="title">生产装置数量:</view>
			<input name="input" v-model="dataList.sczz" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">其中运行数量:</view>
			<input name="input" v-model="dataList.yx" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">停产数量:</view>
			<input name="input" v-model="dataList.tc" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检修数量:</view>
			<input name="input" v-model="dataList.jx" disabled=""></input>
		</view>
		<view class="" style="width: 98%;height: 15rpx;background-color: #ffffd7;border-radius: 10rpx;">
			
		</view>
		<view class="cu-form-group">
			<view class="title">一级动火作业数量:</view>
			<input name="input" v-model="dataList.yjdhzy" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">二级动火作业数量:</view>
			<input name="input" v-model="dataList.ejdhzy" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">特级动火作业数量:</view>
			<input name="input" v-model="dataList.tjdhzy" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">受限空间作业数量:</view>
			<input name="input" v-model="dataList.sxkjzy" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">高处作业数量:</view>
			<input name="input" v-model="dataList.gczy" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">其他作业数量:</view>
			<input name="input" v-model="dataList.qttszy" disabled=""></input>
		</view>
		<view class="" style="width: 98%;height: 15rpx;background-color: #ffffd7;border-radius: 10rpx;">
			
		</view>
		<view class="cu-form-group">
			<view class="title">是否处于试生产:</view>
			<picker @change="bindPickerChange" :value="index" :range="arraySf" class="item2" style="" disabled="">
				<view class="uni-input" style="">{{dataList.sfcyssc}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">是否处于开停车状态:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arraySf" class="item2" style="" disabled="">
				<view class="uni-input" style="">{{dataList.sfcyktc}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">罐区、仓库等重大危险源是否处于安全状态:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arraySf" class="item2" style="" disabled="">
				<view class="uni-input" style="">{{dataList.sfaqzt}}</view>
			</picker>
		</view>
		<!-- <button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="updataCj">确定</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				index1:0,
				index2:0,
				show:false,
				mode:'date',
				
				arraySf:['是','否'],
				dataList:{
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
					cjmc:'',
					sbsj:'',
					sbr:'',
					subids:'',
					sczz:'',
					yx:'',
					tc:'',
					jx:'',
					yjdhzy:'',
					ejdhzy:'',
					tjdhzy:'',
					sxkjzy:'',
					gczy:'',
					qttszy:'',
					sfcyssc:'',
					sfcyktc:'',
					sfaqzt:''
				}
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		methods: {
			//修改班组
			async updataCj(){
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
					url: 'api/judge/bzYpHz',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./cheJianYanPan'
					})
				}
			},
			change(e){
				console.log(e.result);
				this.tbsj = e.result
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.sfcyssc = this.arraySf[this.index]
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.detail.value
				this.dataList.sfcyktc = this.arraySf[this.index2]
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.detail.value
				this.dataList.sfaqzt = this.arraySf[this.index1]
			},
		}
	}
</script>

<style>

</style>
