<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">查处日期:</view>
			<input name="input" v-model="dataList.ccrq" disabled="" @click="calendar"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">单位或员工名称:</view>
			<input name="input" v-model="dataList.dwygmc" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">所属单位:</view>
			<input name="input" v-model="dataList.ssdw" :disabled="up"></input>
		</view>
		<view class="cu-form-group" @click="bmshows" >
			<view class="title">检查部门:</view>
			<view class="uni-input" style="">{{dataList.jcbm}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm" ></u-select>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">三违行为描述:</view>
			<textarea maxlength="-1"  v-model='dataList.swxwms' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">三违属性:</view>
			<picker @change="bindPickerChange" :value="index" :range="arraySx" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.swsx}}</view>
			</picker>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">处理结果:</view>
			<textarea maxlength="-1"  v-model='dataList.cljg' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">检查人:</view>
			<input name="input" v-model="dataList.jcr" :disabled="up"></input>
		</view>
		
		<view class="" style="display: flex;justify-content: space-around;margin-top: 50rpx;">
			<button type="primary" size="mini"  @click="up = false" :disabled="!up">修改</button>
			<button type="primary" size="mini"  @click="updataSw">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				up:true,
				index:0,
				show:false,
				mode:'date',
				bmshow:false,
				ccrq:'',
				swmc:'',
				ssdw:'',
				swxwms:'',
				cljg:'',
				jcr:'',
				arrayBz:[],
				arraySx:['违章操作','违章指挥','违反劳动纪律'],
				dataList:{
					docid:'',
					appid:'2319D2AB933C498BA34459BE401B9551',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'三违上报',
					pribeanname:'com.ruoyi.aqgl.yhpczl.AqYhpczlSwcx',
					ccrq:'',
					dwygmc:'',
					ssdw:'',
					swxwms:'',
					cljg:'',
					jcr:'',
					jcbm:'',
					swsx:'违章操作'
				}
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		onShow() {
			//从缓存获取所有部门
			this.arrayBz = uni.getStorageSync('arrayBz')
		},
		methods: {
			calendar(){
				if(!this.up){
					this.show = true
				}
			},
			bmshows(){
				if(!this.up){
					this.bmshow = true
				}
			},
			//修改三违
			async updataSw(){
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
					url: 'api/doc/updateSwInfo',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./swsb'
					})
				}
			},
			confirm(e){
				this.dataList.jcbm = e[e.length-1].label
				// this.bmid = e[e.length-1].extra
			},
			change(e){
				console.log(e.result);
				this.dataList.ccrq = e.result
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.swsx = this.arraySx[this.index]
			},
		}
	}
</script>

<style>

</style>
