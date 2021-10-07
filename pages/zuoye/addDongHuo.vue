<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>动火证级别:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arraydhzlx">
				<view class="uni-input" style="">{{arraydhzlx[index1]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>作业单位:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{arrayBz[index]}}</view>
			</picker>
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
		<view class="cu-form-group">
			<view class="title">动火位置:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{arrayBz[index2]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">动火详细位置:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{arrayBz[index3]}}</view>
			</picker>
		</view>
		<view class="cu-form-group" @click="getZb">
			<view class="title">获取坐标:</view>
			<input name="input" placeholder="点击获取坐标" disabled="" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">经度:</view>
			<input name="input" v-model="mapList.lng" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">纬度:</view>
			<input name="input" v-model="mapList.lat" disabled=""></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">动火作业内容:</view>
			<textarea maxlength="-1"  v-model='dataList.dhzywzjnr'></textarea>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='dataList.bz'></textarea>
		</view>
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">上传附件:</view>
			<image :src="imgUrl" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
			<!-- <input name="input" v-model="dataList.fj" disabled=""></input> -->
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="addDh">确定</button>
		<!-- <u-avatar class="img" :src="touxiang" ></u-avatar> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFilePaths:'',
				imgUrl:'',
				touxiang:'',
				jingdu:'',
				weidu:'',
				mode:'date',
				show:false,
				arraydhzlx:['特殊动火作业证','一级动火作业证','二级动火作业证'],
				index:0,
				index1:0,
				index2:0,
				index3:0,
				arrayBz:['安全部','财务部'],
				mapList:{
					docid:'',
					appid:'630903BBB975486BBE509F4FFFBC6DB3',
					lat:'',
					lng:'',
					todaytip:'动火作业票',
					dj:1
				},
				dataList:{
					docid:'',
					appid:'242E465CAE6642689258471054D2A707',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'动火作业登记',
					pribeanname:'com.ruoyi.aqgl.tszyzjy.models.Dhzyzjy',
					sgdw:'',
					dhzyjb:'',
					dhzyszdw:'生产部',
					dhzyszdwid:'',
					dhzywzjnr:'',
					yjzysj:'',
					dhzywzdw:'安全部',
					dhzywzqymc:'安全部',
					bz:'',
					fj:'',
					dhzyjb:'特殊动火作业证'
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./donghuo'
			})
			return true;
		},
		onShow() {
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
			
		},
		methods: {
			//上传附件
			// uploadFilesFun() {
			// 	var token = uni.getStorageSync('token')
			// 	var uid = this.guid2()
			// 	console.log(uid);
			//             var _this = this
			//             var REQUESTCODE = 1;
			//             var main = plus.android.runtimeMainActivity();
			//             var Intent = plus.android.importClass('android.content.Intent');
			//             var intent = new Intent(Intent.ACTION_GET_CONTENT);
			//             intent.setType('*/*'); //设置类型，任意类型
			//             //intent.setType("image/*");
			//             //intent.setType("audio/*"); //选择音频
			//             //intent.setType("video/*"); //选择视频 （mp4 3gp 是android支持的视频格式）
			
			//             intent.addCategory(Intent.CATEGORY_OPENABLE);
			//             main.startActivityForResult(intent, REQUESTCODE);
			
			//             main.onActivityResult = function(requestCode, resultCode, data) {
			//                 if (REQUESTCODE == requestCode) {
			//                     var context = main;
			//                     plus.android.importClass(data);
			//                     // 获得文件路径
			//                     var fileData = data.getData();
			//                     var path = plus.android.invoke(fileData, 'getPath');
			// 					_this.dataList.fj = plus.android.invoke(fileData, 'getPath');
			//                     console.log('path:' + path);
								
			// 					uni.uploadFile({
			// 					            url: 'http://192.168.103.133:8001/api/other/uploadFile', //仅为示例，非真实的接口地址
			// 					            filePath: plus.android.invoke(fileData, 'getPath'),
			// 					            name: 'file',
			// 					            formData: {
			// 					                'appid': '242E465CAE6642689258471054D2A707',
			// 									'docid':uid,
			// 									'token':token,
			// 									'files':fileData
			// 					            },
			// 					            success: (uploadFileRes) => {
			// 					                console.log(uploadFileRes.data);
			// 					            }
			// 					        });
			
			//                     // 判断文件类型
			//                     var resolver = context.getContentResolver();
			//                     var fileType = plus.android.invoke(resolver, 'getType', fileData);
			//                     console.log('fileType:' + fileType);
			//                 }
			//             };
			           
			//         },
			    
			
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
			//添加动火
			async addDh(){
				this.mapList.docid = this.guid2()
				this.dataList.docid = this.guid2()
				console.log(this.dataList.docid);
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/work/insertDhInfo',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./donghuo'
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
				// var uid = this.guid2()
				// var token = uni.getStorageSync('token')
				
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
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.dhzyszdw = this.arrayBz[this.index]
				this.dataList.authororgname = this.dataList.dhzyszdw
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.detail.value
				this.dataList.dhzyjb = this.arraydhzlx[this.index1]
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.detail.value
				this.dataList.dhzywzdw = this.arrayBz[this.index2]
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
