<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change" max-date="2030-01-01"></u-calendar>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>登高证级别:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arraydhzlx">
				<view class="uni-input" style="">{{arraydhzlx[index1]}}</view>
			</picker>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title"><span class='star'>*</span>作业单位:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{arrayBz[index]}}</view>
			</picker>
		</view> -->
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">作业所在单位:</view>
			<view class="uni-input" style="">{{dataList.dgzyszdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm"></u-select>
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
		<view class="cu-form-group" @click="getZb">
			<view class="title">获取坐标:</view>
			<input name="input" placeholder="点击获取坐标" disabled="" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">登高位置:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayArea1" class="item2" style="">
				<view class="uni-input" style="width: 100%;height: 60rpx;">{{arrayArea1[index2]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">登高详细位置:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayArea2" class="item2" style="">
				<view class="uni-input" style="width: 100%;height: 60rpx;">{{arrayArea2[index3]}}</view>
			</picker>
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
			<view class="title">登高作业内容:</view>
			<textarea maxlength="-1"  v-model='dataList.dgzywzjnr'></textarea>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='dataList.bz'></textarea>
		</view>
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">上传附件:</view>
			<view>点击上传</view>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChange" :value="fjindex" :range="fj">
				<view class="uni-input">{{fj[fjindex]}}</view>
			</picker>
		</view> -->
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="addDg">确定</button>
		<!-- <u-avatar class="img" :src="touxiang" ></u-avatar> -->
	</view>
</template>

<script>
	import commonUrl from '../../util/util.js'
	export default {
		data() {
			return {
				fj:[],
				fjs:[],
				fjindex:0,
				bmshow:false,
				imgUrl:'',
				touxiang:'',
				mode:'date',
				show:false,
				arraydhzlx:['一级登高作业证','二级登高作业证','三级登高作业证'],
				index:0,
				index1:0,
				index2:-1,
				index3:-1,
				arrayBz:['安全部','财务部'],
				
				arrayArea1:[],
				arrayArea2:[],
				areas:[],
				did:'',
				mapList:{
					docid:'',
					appid:'630903BBB975486BBE509F4FFFBC6DB3',
					lat:'',
					lng:'',
					todaytip:'登高作业票: ',
					todaytipurl:'/common/list/90744BE50C97495FB4C1416BA0484CEE/8554A93D56054B67B44E16EC488762B7',
					dj:1
				},
				dataList:{
					docid:'',
					appid:'8554A93D56054B67B44E16EC488762B7',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'登高作业登记',
					pribeanname:'com.ruoyi.aqgl.tszyzjy.models.Dgzyzjy',
					sgdw:'',
					
					dgzyszdw:'',
					dgzyszdwid:'',
					dgzywzjnr:'',
					yjzysj:'',
					zywzdw:'动力车间',
					zywzqymc:'中控配电室---李文明',
					bz:'',
					fj:'',
					dgzyjb:'一级登高作业证'
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./denggao'
			})
			return true;
		},
		async onShow() {
			//获取所有区域对象
			this.areas = uni.getStorageSync('areas')
			this.getArea2()
			//从缓存获取所有一级区域
			this.arrayArea1 = uni.getStorageSync('arrayArea')
			//获取所有部门
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
			
			//选择地图后的回显
			
			if(uni.getStorageSync('index1') !='' && uni.getStorageSync('index1') !=null){
				this.index1 = uni.getStorageSync('index1')
			}
			uni.removeStorageSync('index1')
			if(uni.getStorageSync('dgzyszdw') !='' && uni.getStorageSync('dgzyszdw') !=null){
				this.dataList.dgzyszdw = uni.getStorageSync('dgzyszdw')
			}
			uni.removeStorageSync('dgzyszdw')
			if(uni.getStorageSync('sgdw') !='' && uni.getStorageSync('sgdw') !=null){
				this.dataList.sgdw = uni.getStorageSync('sgdw')
			}
			uni.removeStorageSync('sgdw')
			if(uni.getStorageSync('yjzysj') !='' && uni.getStorageSync('yjzysj') !=null){
				this.dataList.yjzysj = uni.getStorageSync('yjzysj')
			}
			uni.removeStorageSync('yjzysj')
			if(uni.getStorageSync('index2') !='' && uni.getStorageSync('index2') !=null){
				this.index2 = uni.getStorageSync('index2')
			}
			uni.removeStorageSync('index2')
			if(uni.getStorageSync('dgzywzjnr') !='' && uni.getStorageSync('dgzywzjnr') !=null){
				this.dataList.dgzywzjnr = uni.getStorageSync('dgzywzjnr')
			}
			uni.removeStorageSync('dgzywzjnr')
			if(uni.getStorageSync('index3') !='' && uni.getStorageSync('index3') !=null){
				this.index3 = uni.getStorageSync('index3')
			}
			uni.removeStorageSync('index3')
			if(uni.getStorageSync('bz') !='' && uni.getStorageSync('bz') !=null){
				this.dataList.bz = uni.getStorageSync('bz')
			}
			uni.removeStorageSync('bz')
			
			
			//获取附件列表
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getFile',
				data:{docid:this.dataList.docid}
			})
			for(var i = 0;i<res.data.data.length;i++){
				this.fj.push(res.data.data[i].sfilename)
			
			}
			this.fjs = res.data.data
		},
		onLoad(option) {
			if(parseFloat(option.lat) > 39.253756){
				
					this.mapList.lng = (parseFloat(option.lng) - 0.001)
					this.mapList.lat = (parseFloat(option.lat) - 0.0012)
				
			}else{
				if(parseFloat(option.lng) < 119.054741){
					this.mapList.lng = parseFloat(option.lng) + 0.00004
					this.mapList.lat = (parseFloat(option.lat) - 0.0016)
				}else{
					this.mapList.lng = option.lng
					this.mapList.lat = option.lat
				}
			}
				
			
			
			// this.mapList.lng = option.lng
			// this.mapList.lat = option.lat
			console.log(option.lng);
			console.log(option.lat);
		},
		methods: {
			//获取二级区域
			async getArea2(){
				for(var i=0;i<this.areas.length;i++){
					if(this.dataList.zywzdw == this.areas[i].dw){
						this.did = this.areas[i].docid
						break
					}
				}
				const area = await this.$myRequest({
					method: 'POST',
					url: 'api/other/getTwoArea',
					data:{
						docid:this.did
					}
				})
				if(area.data.code==200){
					this.arrayArea2 = []
					for(var i=0;i<area.data.data.length;i++){
						this.arrayArea2.push(area.data.data[i].qymc+'---'+area.data.data[i].zrr)
					}
					this.dataList.zywzqymc = this.arrayArea2[0]
				}
			},
			//接收坐标
			// otherFun(obj){
			// 	if(!!obj){
			// 		console.log(obj.lon);
			// 		console.log(obj.lat);
			// 		this.mapList.lng = obj.lon
			// 		this.mapList.lat = obj.lat
			// 	}
			// },
			//获取坐标
			getZb(){
				uni.setStorageSync('index1',this.index1)
				uni.setStorageSync('dgzyszdw',this.dataList.dgzyszdw)
				uni.setStorageSync('sgdw',this.dataList.sgdw)
				uni.setStorageSync('yjzysj',this.dataList.yjzysj)
				uni.setStorageSync('index2',this.index2)
				uni.setStorageSync('index3',this.index3)
				uni.setStorageSync('dgzywzjnr',this.dataList.dgzywzjnr)
				uni.setStorageSync('bz',this.dataList.bz)
				uni.navigateTo({
					url:'../zuobiao/map1'
				})
			},
			//添加登高
			async addDg(){
				if(this.mapList.lat != null && this.mapList.lng != null){
				this.mapList.docid = this.guid2()
				if(this.dataList.docid == ''){
					this.dataList.docid = this.guid2()
				}
				console.log(this.dataList.docid);
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/work/insertGcInfo',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./denggao'
					})
				}
				this.mapList.todaytip += this.dataList.dgzywzjnr
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
				}else{
					uni.showToast({
						title:'请选取坐标点'
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
			//上传附件
			chooseImage() {
				if(this.dataList.docid == ''){
					this.dataList.docid = this.guid2()
				}
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: commonUrl.url1+'/api/other/uploadFile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'files',
							formData: {
								'docid': this.dataList.docid,
								'appid': this.dataList.appid,
								'type': 'fileinput-gczyfj'
							},
							header: {
								'token': uni.getStorageSync("token")
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				})
			},
			change(e){
				console.log(e.result);
				this.dataList.yjzysj = e.result
			},
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为1111', e.target.value)
			            this.fjindex = e.target.value
						console.log(this.fjindex);
						var path = commonUrl.url2+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid
						console.log(path);
						window.open("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent(path));
						
			        },
			// bindPickerChange(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index = e.detail.value
			// 	this.dataList.dgzyszdw = this.arrayBz[this.index]
			// },
			confirm(e){
				this.dataList.dgzyszdw = e[e.length-1].label
				// this.bmid = e[e.length-1].extra
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.detail.value
				this.dataList.dgzyjb = this.arraydhzlx[this.index1]
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.detail.value
				this.dataList.zywzdw = this.arrayArea1[this.index2]
				this.getArea2()
			},
			bindPickerChange3(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index3 = e.detail.value
				this.dataList.zywzqymc = this.arrayArea2[this.index3]
			},
		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
</style>
