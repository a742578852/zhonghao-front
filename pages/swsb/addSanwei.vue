<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change" max-date="2030-01-01"></u-calendar>
		<view class="cu-form-group">
			<view class="title">查处日期:</view>
			<input name="input" v-model="dataList.ccrq" disabled="" @click="show = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">单位或员工名称:</view>
			<input name="input" v-model="dataList.dwygmc" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">所属单位:</view>
			<input name="input" v-model="dataList.ssdw" ></input>
		</view>
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">检查部门:</view>
			<view class="uni-input" style="">{{dataList.jcbm}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm"></u-select>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">三违行为描述:</view>
			<textarea maxlength="-1"  v-model='dataList.swxwms'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">三违属性:</view>
			<picker @change="bindPickerChange" :value="index" :range="arraySx" class="item2" style="">
				<view class="uni-input" style="">{{arraySx[index]}}</view>
			</picker>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">处理结果:</view>
			<textarea maxlength="-1"  v-model='dataList.cljg'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">检查人:</view>
			<input name="input" v-model="dataList.jcr" disabled=""></input>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="addSw">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				show:false,
				mode:'date',
				bmshow:false,
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
		onShow() {
			//从缓存获取所有部门
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
			var admin = uni.getStorageSync('admin')
			this.dataList.jcr = admin.userName
			this.dataList.authorname = admin.userName
			this.dataList.authorid = admin.userId
			var time = year+'-' + month+'-' + day
			this.dataList.ccrq = time
			this.dataList.createtime = time
		},
		methods: {
			//添加三违上报
			async addSw(){
				
				this.dataList.docid = this.guid2()
				console.log(this.dataList.docid);
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/doc/insertSwInfo',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./swsb'
					})
				}
				
				
			},
			confirm(e){
				this.dataList.jcbm = e[e.length-1].label
				console.log(e[e.length-1]);
				// this.bmid = e[e.length-1].extra
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
