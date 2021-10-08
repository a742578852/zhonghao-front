<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">操作规程名称:</view>
			<input name="input" v-model="dataList.czgcmc" ></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">发布单位:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayfbdw" class="item2" style="">
				<view class="uni-input" style="">{{arrayfbdw[index]}}</view>
			</picker>
		</view> -->
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">发布单位:</view>
			<view class="uni-input" style="">{{dataList.fbdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayfbdw" @confirm="confirm"></u-select>
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
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="addGc">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bmshow:false,
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
					fbdw:'安全部',
					zxxdrq:'',
					czgcjj:'',
					bz:''
				}
			}
		},
		async onShow() {
			// const dept = await this.$myRequest({
			// 	method: 'POST',
			// 	url: 'api/other/getAllDept',
			// })
			this.arrayfbdw = uni.getStorageSync('arrayBz')
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
			this.dataList.zxxdrq = time
			this.dataList.createtime = time
			
			
			
		},
		methods: {
			async addGc(){
				this.dataList.docid = this.guid2()
				console.log(this.dataList.docid);
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/other/insertRules',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./caoZuoGuiCheng'
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
			// bindPickerChange(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index = e.detail.value
			// 	this.dataList.fbdw = this.arrayfbdw[this.index]
			// },
			confirm(e){
				this.dataList.fbdw = e[e.length-1].label
				// this.bmid = e[e.length-1].extra
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
