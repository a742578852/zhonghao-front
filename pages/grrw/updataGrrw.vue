<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-popup v-model="bmChoiseShow" mode="center" width="90%" height="75%" border-radius="14">
			<view class="cu-form-group" @click="bmChoise=true" style="margin-bottom: 20rpx;">
				<view class="title">选择指派人部门:</view>
				<view class="uni-input" style="border-bottom: solid 1rpx #cfcfcf;width: 300rpx;">{{bumen}}</view>
				<u-select v-model="bmChoise" mode="mutil-column-auto" :list="arrayBz" @confirm="bmconfirm"></u-select>
			</view>
			<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;margin-bottom: 20rpx;">
				<text>部门人员</text>
			</view>
			<view class="bm">
				<view class="bmry" v-for="(item,index) in bmry">
					<text @click="addRy(item)">{{item}}</text>
				</view>
			</view>
			<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
				<text>已选择指派人</text>
			</view>
			<view class="bms">
				<u-tag :text="dataList.xjr" mode="light"  closeable  @close="tagClick()" />
			</view>
				<button type="primary" size="mini" style="width: 50%;margin-left: 25%;margin-top: 30rpx;" @click="zhuanjiao">确定</button>
			
			
		</u-popup>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<scroll-view class="scroll-view_H" scroll-x="true" >
			<view class="content" style="background-color: #bbfeff;font-size: 35rpx;">
				<view class="content-item" style="width: 8%;">
					<text>序号</text>
				</view>
				<view class="content-item" style="width: 50%;">
					<text>检查内容</text>
				</view>
				<view class="content-item" style="width: 18%;">
					<text>整改方式</text>
				</view>
			</view>
			<view class="content" v-for="(item,index) in rwList">
				<view class="content-item" style="width: 8%;">
					<text>{{index+1}}</text>
				</view>
				<view class="content-item" style="width: 50%;">
					<text>{{item.xjnr}}</text>
				</view>
				<view class="content-item" style="width: 18%;">
					<picker @change="bindPickerChange" @click="zgfsClick(rwList,index)"  :range="arrayZgfs" style="width: 200rpx;height: 10rpx;">
						<view class="uni-input" v-if="item.xjjg == 0 ">隐患整改通知</view>
						<view class="uni-input" v-if="item.xjjg == 1 ">已检查无隐患</view>
						<!-- <view class="uni-input" v-if="item.xjjg == 2">请选择</view> -->
						<!-- <view class="uni-input" v-if="index == 0">{{zgfs[0]}}</view>
						<view class="uni-input" v-if="index == 1">{{zgfs[1]}}</view>
						<view class="uni-input" v-if="index == 2">{{zgfs[2]}}</view>
						<view class="uni-input" v-if="index == 3">{{zgfs[3]}}</view>
						<view class="uni-input" v-if="index == 4">{{zgfs[4]}}</view>
						<view class="uni-input" v-if="index == 5">{{zgfs[5]}}</view>
						<view class="uni-input" v-if="index == 6">{{zgfs[6]}}</view>
						<view class="uni-input" v-if="index == 7">{{zgfs[7]}}</view>
						<view class="uni-input" v-if="index == 8">{{zgfs[8]}}</view>
						<view class="uni-input" v-if="index == 9">{{zgfs[9]}}</view> -->
					</picker>
				</view>
			</view>
		</scroll-view>
		<view class="cu-form-group align-start">
			<view class="title">巡检情况:</view>
			<textarea maxlength="-1"  v-model='dataList.xjqk' oninput="value = value.replace(/(^\s*)|(\s*$)/g,'')"></textarea>
		</view>
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">上传附件:</view>
			<view>点击上传</view>
		</view>
		<view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChange1" :value="fjindex" :range="fj">
				<view class="uni-input">{{fj[fjindex]}}</view>
			</picker>
		</view>
		<view class="cu-form-group" >
			<view class="title">巡检人:</view>
			<input name="input" v-model="dataList.xjr" disabled=""></input>
		</view>
		<view class="cu-form-group" @click="shouqian">
			<view class="title">手写签名:</view>
			<input name="input" placeholder="点击进行签名"  disabled=""></input>
		</view>
		<image :src="grPath" mode=""></image>
		<view class="cu-form-group">
			<view class="title">巡检完成日期:</view>
			<input name="input" v-model="dataList.lastmodifiedtime" disabled="" @click="show = true"></input>
		</view>
		<u-toast ref="uToast" />
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="bmChoiseShow = true">转交当前任务</button>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="tijiao">确定</button>
		
	</view>
	
</template>

<script>
	import commonUrl from '../../util/util.js'
	export default {
		data() {
			return {
				fuck:-1,
				grrwRwList:[],
				grPath:'',
				findex:0,
				bmChoiseShow:false,
				bmChoise:false,
				bumen:'',
				bmry:[],
				arrayBz:[],
				mode:'date',
				show:false,
				fj:[],
				fjs:[],
				fjindex:0,
				zgfsIndex:0,
				zgfs:[
					'已检查无隐患',
					'已检查无隐患',
					'已检查无隐患',
					'已检查无隐患',
					'已检查无隐患',
					'已检查无隐患',
					'已检查无隐患',
					'已检查无隐患',
					'已检查无隐患',
					'已检查无隐患'
				],
				
				picker1:true,
				picker2:false,
				picker3:false,
				ind:0,
				rwList:[],
				arrayZgfs:['隐患整改通知','已检查无隐患'],
				docid:'',
				dataList:{
					xjqk:'',
					lastmodifiedtime:'',
					xjrqz:'',
					xjrqzid:''
				},
				gw:'',
				
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'grrw'
			})
			return true;
		},
		onLoad(option) {
			if(uni.getStorageSync('xjqk')!=''){
				this.dataList.xjqk = uni.getStorageSync('xjqk')
			}
			if(uni.getStorageSync('xjr')!=''){
				this.dataList.xjr = uni.getStorageSync('xjr')
			}
			if(option.gw!=''){
				this.gw = option.gw
				console.log(option.gw);
			}
			
			this.dataList = JSON.parse(option.items)
			this.grPath = commonUrl.url2+this.dataList.autographImg
			
			// this.dataList.xjr = ''
			
			// this.dataList.docid = JSON.parse(option.items).docid
			this.docid = JSON.parse(option.items).docid
			uni.setStorageSync('docids',this.docid)
			console.log(this.docid);
			
		},
		onReady() {
					this.$refs.uTips.show({
						title: '至少上报一条隐患',
						type: 'error',
						duration: '1500'
					})
				},
		async onShow() {
			//获取登录人
			this.dataList.xjrqz = uni.getStorageSync('admin').userName
			this.dataList.xjrqzid = uni.getStorageSync('admin').userId
			//获取个人任务签名地址
			// this.grPath = uni.getStorageSync('grPath')
			this.getByMid()
			//获取所有部门
			this.arrayBz = uni.getStorageSync('arrayBz')
			if(uni.getStorageSync('docidd') !=null && uni.getStorageSync('docidd') !=''){
				this.docid = uni.getStorageSync('docidd')
				// this.dataList.docid = this.docid
				uni.removeStorageSync('docidd')
				this.getRwList()
			}else{
				this.getRwList()
			}
			// if(uni.getStorageSync('rwList')!=null && uni.getStorageSync('rwList')!=''){
			// 	console.log('get');
			// 	this.rwList = JSON.parse(uni.getStorageSync('rwList'))
			// 	console.log(this.docid);
			// 	this.getRwList()
			// 	uni.removeStorageSync('rwList')
			// 	// for(var i=0;i<this.rwList.length;i++){
			// 	// 	if(this.rwList[i].xjjg == '' || this.rwList[i].xjjg == null){
			// 	// 		this.rwList[i].xjjg = 1
			// 	// 	}
			// 	// }
			// }else{
			// 	//获取任务列表
			// 	this.getRwList()
			// }
			//获取附件列表
			if(this.gw!=1){
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getFile',
				data:{docid:this.dataList.docid}
			})
			for(var i = 0;i<res.data.data.length;i++){
				this.fj.push(res.data.data[i].sfilename)
			
			}
			this.fjs = res.data.data
			}
			//获取当前时间
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let hours = date.getHours()
			let mins = date.getMinutes()
			let sens = date.getSeconds()
			if(month < 10){
				month = '0' + month;
			}
			if(hours < 10){
				hours = '0' + hours;
			}
			if(day < 10){
				day = '0' + day;
			}
			if(mins < 10){
				mins = '0' + mins;
			}
			if(sens < 10){
				sens = '0' + sens;
			}
			var time = year+'-' + month+'-' + day+ ' '+hours+':'+mins+':'+sens
			// this.dataList.lastmodifiedtime = time
		},
		
		methods: {
			
			//转交
			async zhuanjiao(){
				this.bmChoiseShow = false
				for(var i=0;i<this.bmobj.length;i++){
					if(this.bmobj[i].userName == this.dataList.xjr){
						this.dataList.xjrid = this.bmobj[i].userId
					}
				}
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/updateTask',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data:JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if (res.data.code == 200) {
					uni.navigateTo({
						url:'grrw'
					})
				}
			},
			//根据部门ID查询人员
			async getByMid(){
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/other/getUserByDeptId',
					data:{
						deptId :this.bmid
					}
				})
				
				if (res.data.code == 200) {
					this.bmobj = res.data.data
					// console.log(JSON.stringify(this.bmobj));
					for(var i=0;i<this.bmobj.length;i++){
						this.bmry.push(this.bmobj[i].userName)
					}
				}
			},
			//删除选择人员
			tagClick(){
				
				this.dataList.xjr = ''
			},
			//添加人员
			addRy(item){
				this.dataList.xjr = ''
				this.dataList.xjr = item
			},
			bmconfirm(e){
				this.bumen = e[e.length-1].label
				this.bmid = e[0].extra
				this.getByMid()
			},
			async tijiao(){
				
				if(this.dataList.xjqk !='' && this.dataList.xjqk !=null){
				var _this = this
				uni.removeStorageSync('xjqk')
				uni.removeStorageSync('xjr')
				this.$refs.uToast.show({
					title: '请在隐患整改栏目中将隐患流转',
				type: 'error',
				})
				//获取当前时间
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hours = date.getHours()
				let mins = date.getMinutes()
				let sens = date.getSeconds()
				if(month < 10){
					month = '0' + month;
				}
				if(hours < 10){
					hours = '0' + hours;
				}
				if(day < 10){
					day = '0' + day;
				}
				if(mins < 10){
					mins = '0' + mins;
				}
				if(sens < 10){
					sens = '0' + sens;
				}
				var time = year+'-' + month+'-' + day+ ' '+hours+':'+mins+':'+sens
				this.dataList.lastmodifiedtime = time
				this.dataList.docid = uni.getStorageSync('docids')
				var token = uni.getStorageSync('token')
				console.log(JSON.stringify(this.dataList));
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/updateTask',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data:JSON.stringify(this.dataList)
				})
				console.log(res);
				if(res.data.code == 200){
					setTimeout(() => {
					    uni.navigateTo({
					    	url:'grrw'
					    })
					  }, 1000);
				}
				for(var i=0;i<this.rwList.length;i++){
					
					const ress = await this.$myRequest({
						method: 'POST',
						url: 'api/danger/updateInspect',
						header:{
							'content-type': 'application/json;charset=utf-8',
							'token': token
						},
						data:JSON.stringify(this.rwList[i])
					})
				}
				}else{
					uni.showToast({
						title:'填写巡检情况'
					})
				}
			},
			async tijiao1(){
				//获取当前时间
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hours = date.getHours()
				let mins = date.getMinutes()
				let sens = date.getSeconds()
				if(month < 10){
					month = '0' + month;
				}
				if(hours < 10){
					hours = '0' + hours;
				}
				if(day < 10){
					day = '0' + day;
				}
				if(mins < 10){
					mins = '0' + mins;
				}
				if(sens < 10){
					sens = '0' + sens;
				}
				var time = year+'-' + month+'-' + day+ ' '+hours+':'+mins+':'+sens
				this.dataList.lastmodifiedtime = time
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/updateTask',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data:JSON.stringify(this.dataList)
				})
				// if(res.data.code == 200){
				// 	uni.setStorageSync('rwList',JSON.stringify(this.rwLsit))
					
				// }
				for(var i=0;i<this.rwList.length;i++){
					
					const ress = await this.$myRequest({
						method: 'POST',
						url: 'api/danger/updateInspect',
						header:{
							'content-type': 'application/json;charset=utf-8',
							'token': token
						},
						data:JSON.stringify(this.rwList[i])
					})
					// console.log(ress);
					
				}
			},
			//手写签名
			shouqian(){
				uni.navigateTo({
					url:'../shouqian/shouqian?type=2&docid='+this.docid
				})
			},
			change(e){
				console.log(e.result);
				this.dataList.lastmodifiedtime = e.result
			},
			//上传附件
			chooseImage() {
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
			//获取任务列表
			async getRwList(){
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/getMyIns',
					data:{
						pdocid:this.docid
					}
				})
				if (res.data.code == 200) {
					this.rwList = res.data.data
					
					for(var i=0;i<this.rwList.length;i++){
						if(this.rwList[i].xjjg == '' || this.rwList[i].xjjg == null){
							this.rwList[i].xjjg = 1
						}
						
						
					}
					// console.log(JSON.stringify(this.bmobj));
					
				}
			},
			bindPickerChange1: function(e) {
			            console.log('picker发送选择改变，携带值为1111', e.target.value)
			            this.fjindex = e.target.value
						console.log(this.fjindex);
						var path = commonUrl.url2+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid
						console.log(path);
						// plus.runtime.openURL("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent(path));
						// window.open("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent(path));
						//#ifdef APP-PLUS
						plus.runtime.openURL(path);
						//#endif
						//#ifdef H5
						window.open(path);
						//#endif
			        },
			async bindPickerChange(e) {
				uni.setStorageSync('xjqk',this.dataList.xjqk)
				uni.setStorageSync('xjr',this.dataList.xjr)
				this.tijiao1()
				var ind = e.detail.value
				
				this.rwList[this.findex].xjjg = ind
				if(ind == 0){
					uni.setStorageSync('rw',1)
					uni.navigateTo({
						url:'../yhzg/addYhzg'
					})
				}
				// for(var i=0;i<this.rwList.length;i++){
				// 	this.rwList[this.findex].xjjg = ind
				// 	console.log(this.rwList[15].xjjg);
				// }
				
				// if(this.zgfsIndex == 0){
				// 	if(this.ind == 0){
				// 		this.zgfs[0] = '已检查无隐患'
				// 		this.rwList[0].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[0] = '隐患整改通知'
				// 		this.rwList[0].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[0] = '现场立即整改'
				// 		this.rwList[0].xjjg = 2
				// 	}
					
				// }
				// if(this.zgfsIndex == 1){
				// 	if(this.ind == 0){
				// 		this.zgfs[1] = '已检查无隐患'
				// 		this.rwList[1].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[1] = '隐患整改通知'
				// 		this.rwList[1].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[1] = '现场立即整改'
				// 		this.rwList[1].xjjg = 2
				// 	}
				// }
				// if(this.zgfsIndex == 2){
				// 	if(this.ind == 0){
				// 		this.zgfs[2] = '已检查无隐患'
				// 		this.rwList[2].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[2] = '隐患整改通知'
				// 		this.rwList[2].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[2] = '现场立即整改'
				// 		this.rwList[2].xjjg = 2
				// 	}
				// }
				// if(this.zgfsIndex == 3){
				// 	if(this.ind == 0){
				// 		this.zgfs[3] = '已检查无隐患'
				// 		this.rwList[3].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[3] = '隐患整改通知'
				// 		this.rwList[3].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[3] = '现场立即整改'
				// 		this.rwList[3].xjjg = 2
				// 	}
				// }
				// if(this.zgfsIndex == 4){
				// 	if(this.ind == 0){
				// 		this.zgfs[4] = '已检查无隐患'
				// 		this.rwList[4].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[4] = '隐患整改通知'
				// 		this.rwList[4].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[4] = '现场立即整改'
				// 		this.rwList[4].xjjg = 2
				// 	}
				// }
				// if(this.zgfsIndex == 5){
				// 	if(this.ind == 0){
				// 		this.zgfs[5] = '已检查无隐患'
				// 		this.rwList[5].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[5] = '隐患整改通知'
				// 		this.rwList[5].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[5] = '现场立即整改'
				// 		this.rwList[5].xjjg = 2
				// 	}
				// }
				// if(this.zgfsIndex == 6){
				// 	if(this.ind == 0){
				// 		this.zgfs[6] = '已检查无隐患'
				// 		this.rwList[6].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[6] = '隐患整改通知'
				// 		this.rwList[6].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[6] = '现场立即整改'
				// 		this.rwList[6].xjjg = 2
				// 	}
				// }
				// if(this.zgfsIndex == 7){
				// 	if(this.ind == 0){
				// 		this.zgfs[7] = '已检查无隐患'
				// 		this.rwList[7].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[7] = '隐患整改通知'
				// 		this.rwList[7].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[7] = '现场立即整改'
				// 		this.rwList[7].xjjg = 2
				// 	}
				// }
				// if(this.zgfsIndex == 8){
				// 	if(this.ind == 0){
				// 		this.zgfs[8] = '已检查无隐患'
				// 		this.rwList[8].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[8] = '隐患整改通知'
				// 		this.rwList[8].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[8] = '现场立即整改'
				// 		this.rwList[8].xjjg = 2
				// 	}
				// }
				// if(this.zgfsIndex == 9){
				// 	if(this.ind == 0){
				// 		this.zgfs[9] = '已检查无隐患'
				// 		this.rwList[9].xjjg = 1
				// 	}
				// 	if(this.ind == 1){
				// 		this.zgfs[9] = '隐患整改通知'
				// 		this.rwList[9].xjjg = 0
				// 	}
				// 	if(this.ind == 2){
				// 		this.zgfs[9] = '现场立即整改'
				// 		this.rwList[9].xjjg = 2
				// 	}
				// }
				
			},
			zgfsClick(rwLsit,index){
				this.fuck = index
				// console.log(JSON.stringify(rwLsit));
				// uni.setStorageSync('rwList',JSON.stringify(rwLsit))
				uni.setStorageSync('docidd',this.docid)
				this.findex = index
			}
		},
		
	}
</script>

<style lang="scss">
	.scroll-view_H {
		// white-space: nowrap;
		.content {
			width: 140%;
			margin-bottom: 10rpx;
			padding-bottom: 10rpx;
			padding-top: 10rpx;
			background-color: #f3feff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.content-item {
				width: 40%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				white-space: pre-wrap;
	
			}
		}
	}
	.bm {
		width: 98%;
		display: flex;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		border-bottom: 2rpx solid #747474;
		.bmry {
			margin-bottom: 20rpx;
			width: 15%;
			height: 30rpx;
			line-height: 30rpx;
		}
	}
	.bms {
		width: 98%;
		display: flex;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		
		.bmrys {
			margin-bottom: 20rpx;
			width: 24%;
			height: 30rpx;
			line-height: 30rpx;
		}
	}
</style>
