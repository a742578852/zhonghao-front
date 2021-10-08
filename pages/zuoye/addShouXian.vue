<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<!-- <view class="cu-form-group">
			<view class="title"><span class='star'>*</span>作业单位:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{arrayBz[index]}}</view>
			</picker>
		</view> -->
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">作业单位:</view>
			<view class="uni-input" style="">{{dataList.zyszdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm"></u-select>
		</view>
		<view class="cu-form-group">
			<view class="title">申请人:</view>
			<input placeholder="" name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">施工单位:</view>
			<input name="input" v-model="dataList.sgdw" ></input>
		</view> -->
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>受限空间作业时间:</view>
			<input name="input" v-model="dataList.yjzysj" disabled="" @click="show = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">受限空间作业位置:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayBzs" class="item2" style="">
				<view class="uni-input" style="">{{arrayBzs[index2]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">受限空间作业详细位置:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayBzs" class="item2" style="">
				<view class="uni-input" style="">{{arrayBzs[index3]}}</view>
			</picker>
		</view>
		<view class="cu-form-group" @click="getZb">
			<view class="title">获取坐标:</view>
			<input name="input" placeholder="点击获取坐标" disabled="" ></input>
		</view>
		<view class="cu-form-group" v-if="false">
			<view class="title">经度:</view>
			<input name="input" v-model="mapList.lng" disabled=""></input>
		</view>
		<view class="cu-form-group" v-if="false">
			<view class="title">纬度:</view>
			<input name="input" v-model="mapList.lat" disabled=""></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title"><span class='star'>*</span>受限空间作业内容:</view>
			<textarea maxlength="-1"  v-model='dataList.zywzjzynr'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>落实情况:</view>
			<input name="input" v-model="dataList.lsqk" ></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='dataList.bz'></textarea>
		</view>
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">上传附件:</view>
			<image :src="imgUrl" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="addSx">确定</button>
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
				bmshow:false,
				index:0,
				index1:0,
				index2:0,
				index3:0,
				arrayBz:['安全部','财务部'],
				arrayBzs:['安全部','财务部'],
				mapList:{
					docid:'',
					appid:'630903BBB975486BBE509F4FFFBC6DB3',
					lat:'',
					lng:'',
					todaytip:'受限空间作业票',
					dj:1
				},
				dataList:{
					docid:'',
					appid:'C2C012A7DBAC4385B1891DC2902A58A1',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'受限空间作业登记',
					pribeanname:'com.ruoyi.aqgl.tszyzjy.models.Sxkjzyzjy',
					sgdw:'',
					
					zyszdw:'',
					zyszdwid:'',
					zywzjzynr:'',
					yjzysj:'',
					zywzdw:'安全部',
					zywzqymc:'安全部',
					bz:'',
					fj:'',
					lsqk:''
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./shouxiankongjian'
			})
			return true;
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
			this.dataList.yjzysj = time
			this.dataList.createtime = time
			
			var admin = uni.getStorageSync('admin')
			this.dataList.authorname = admin.userName
			this.dataList.authorid = admin.userId
		},
		methods: {
			//接收坐标
			otherFun(obj){
				if(!!obj){
					this.mapList.lng = obj.lon
					this.mapList.lat = obj.lat
				}
			},
			//获取坐标
			getZb(){
				uni.navigateTo({
					url:'../zuobiao/map'
				})
			},
			//添加受限空间
			async addSx(){
				this.mapList.docid = this.guid2()
				this.dataList.docid = this.guid2()
				console.log(this.dataList.docid);
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/work/insertSxInfo',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./shouxiankongjian'
					})
				}
				//添加坐标
				const ress = await this.$myRequest({
					method: 'POST',
					url: 'api/other/insertMap',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.mapList)
					
				})
				console.log(ress);
				
			},
			//生成uuid
			guid2() {
			    function S4() {
			        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			    }
			    return (S4() + S4() +  S4() +  S4() +  S4() +  S4() + S4() + S4());
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
			// 	this.dataList.zyszdw = this.arrayBz[this.index]
			// },
			confirm(e){
				this.dataList.zyszdw = e[e.length-1].label
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
				this.dataList.zywzdw = this.arrayBz[this.index2]
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
