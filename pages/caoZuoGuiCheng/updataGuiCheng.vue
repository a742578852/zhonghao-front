<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">操作规程名称:</view>
			<input name="input" v-model="dataList.czgcmc" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">发布单位:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayfbdw" class="item2" style="">
				<view class="uni-input" style="">{{dataList.fbdw}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">最后修订日期:</view>
			<input name="input" v-model="dataList.zxxdrq" disabled="" @click="show = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">操作规程简介:</view>
			<input name="input" v-model="dataList.czgcjj" ></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='dataList.bz'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj" disabled=""></input>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="updataGc">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				show:false,
				mode:'date',
				czgc:'',
				xdrq:'',
				gcjj:'',
				bz:'',
				fj:'',
				arrayfbdw:['安全部','财务部'],
				dataList:{
					docid:'',
					appid:'C1CFC5AAAE7C4E688634E432E9D2F6A2',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'操作规程登记',
					pribeanname:'com.ruoyi.aqgl.tzzl.AqFxglAqczgc',
					czgcmc:'',
					fbdw:'',
					zxxdrq:'',
					czgcjj:'',
					bz:''
				}
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		methods: {
			//修改规程
			async updataGc(){
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
					url: 'api/other/updateRules',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./caoZuoGuiCheng'
					})
				}
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.fbdw = this.arrayfbdw[this.index]
			},
			change(e){
				console.log(e.result);
				this.dataList.zxxdrq = e.result
			},
		}
	}
</script>

<style>

</style>
