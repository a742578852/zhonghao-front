<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">填报人:</view>
			<input name="input" v-model="dataList.authorname" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报部门:</view>
			<input name="input" v-model="dataList.authororgname" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.sbsj" disabled="" @click="show = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">车间名称:</view>
			<input name="input" v-model="dataList.cjmc" ></input>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;font-size: 40rpx;">
			<text>车间状态</text>
		</view>
		<view class="cu-form-group">
			<view class="title">生产装置数量:</view>
			<input name="input" v-model="dataList.sczz" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">其中运行数量:</view>
			<input name="input" v-model="dataList.yx" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">停产数量:</view>
			<input name="input" v-model="dataList.tc" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检修数量:</view>
			<input name="input" v-model="dataList.jx" ></input>
		</view>
		<view class="" style="width: 98%;height: 15rpx;background-color: #ffffd7;border-radius: 10rpx;">
			
		</view>
		<view class="cu-form-group">
			<view class="title">一级动火作业数量:</view>
			<input name="input" v-model="dataList.yjdhzy" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">二级动火作业数量:</view>
			<input name="input" v-model="dataList.ejdhzy" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">特级动火作业数量:</view>
			<input name="input" v-model="dataList.tjdhzy" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">受限空间作业数量:</view>
			<input name="input" v-model="dataList.sxkjzy" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">高处作业数量:</view>
			<input name="input" v-model="dataList.gczy" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">其他作业数量:</view>
			<input name="input" v-model="dataList.qttszy" ></input>
		</view>
		<view class="" style="width: 98%;height: 15rpx;background-color: #ffffd7;border-radius: 10rpx;">
			
		</view>
		<view class="cu-form-group">
			<view class="title">是否处于试生产:</view>
			<picker @change="bindPickerChange" :value="index" :range="arraySf" class="item2" style="">
				<view class="uni-input" style="">{{arraySf[index]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">是否处于开停车状态:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arraySf" class="item2" style="">
				<view class="uni-input" style="">{{arraySf[index1]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">罐区、仓库等重大危险源是否处于安全状态:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arraySf" class="item2" style="">
				<view class="uni-input" style="">{{arraySf[index2]}}</view>
			</picker>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="updataCj">确定</button>
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
					appid:'073F8BE6EFD5485FB4E90A012507C9CA',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'',
					createtime:'',
					lastmodifiedtime:'',
					appname:'风险研判-公司级',
					pribeanname:'com.ruoyi.aqgl.fxgl.models.Fxypgsj',
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
					sfcyssc:'是',
					sfcyktc:'是',
					sfaqzt:'是'
				}
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			console.log(this.dataList.cjmc);
			this.dataList.appid = '073F8BE6EFD5485FB4E90A012507C9CA'
			// this.dataList.tjdhzy = option.tsdh
			// this.dataList.yjdhzy = option.yjdh
			// this.dataList.ejdhzy = option.ejdh
			// this.dataList.sxkjzy = option.sxkj
			
		},
		onShow() {
			var admin = uni.getStorageSync('admin')
			this.dataList.authorname = admin.userName
			this.dataList.authorid = admin.userId
			this.dataList.authororgname = admin.deptName
			this.dataList.authororgid = admin.deptId
		},
		methods: {
			//添加公司
			async updataCj(){
				if(this.dataList.cjmc !='' && this.dataList.authorname !='' && this.dataList.authororgname !='' && this.dataList.sbsj !=''){
				this.dataList.docid = this.guid2()
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
				var token = uni.getStorageSync('token')
				
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/judge/insertGsYp',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./gongSiYanPan'
					})
				}
				}else{
					uni.showToast({
						title:'请填写完整'
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
			change(e){
				console.log(e.result);
				this.dataList.sbsj = e.result
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
