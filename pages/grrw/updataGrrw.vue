<template>
	<view>
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
					<picker @change="bindPickerChange" @click="zgfsClick(findex = index)"  :range="arrayZgfs" >
						<view class="uni-input" v-if="item.xjjg == 0">隐患整改通知</view>
						<view class="uni-input" v-if="item.xjjg == 1">已检查无隐患</view>
						<view class="uni-input" v-if="item.xjjg == 2">现场立即整改</view>
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
			<textarea maxlength="-1"  v-model='dataList.xjqk' ></textarea>
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
		<view class="cu-form-group" @click="shouqian">
			<view class="title">手写签名:</view>
			<input name="input" placeholder="点击进行签名"  disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">巡检完成日期:</view>
			<input name="input" v-model="dataList.lastmodifiedtime" disabled="" @click="show = true"></input>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="bmChoiseShow = true">转交当前任务</button>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="tijiao">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				arrayZgfs:['隐患整改通知','已检查无隐患','现场立即整改'],
				docid:'',
				dataList:{
					xjqk:'',
					lastmodifiedtime:'',
					
				}
					
				
			}
		},
		onLoad(option) {
			
			this.dataList = JSON.parse(option.items)
			this.dataList.xjr = ''
			
			// this.dataList.docid = JSON.parse(option.items).docid
			this.docid = JSON.parse(option.items).docid
			console.log(this.docid);
			
		},
		async onShow() {
			this.getByMid()
			//获取所有部门
			this.arrayBz = uni.getStorageSync('arrayBz')
			this.getRwList()
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
		methods: {
			//转交
			async zhuanjiao(){
				this.bmChoiseShow = false
				for(var i=0;i<this.bmobj.length;i++){
					if(this.bmobj[i].userName == this.dataList.xjr){
						this.dataList.xjrid = this.bmobj[i].userId
					}
				}
				// var token = uni.getStorageSync('token')
				// const res = await this.$myRequest({
				// 	method: 'POST',
				// 	url: 'api/danger/insertTask',
				// 	header:{
				// 		'content-type': 'application/json;charset=utf-8',
				// 		'token': token
				// 	},
				// 	data:JSON.stringify(this.dataList)
					
				// })
				// console.log(res);
				// if (res.data.code == 200) {
				// 	uni.navigateTo({
				// 		url:'grrw'
				// 	})
				// }
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
				if(res.data.code == 200){
					uni.navigateTo({
						url:'grrw'
					})
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
					// console.log(ress);
					
				}
			},
			//手写签名
			shouqian(){
				uni.navigateTo({
					url:'../shouqian/shouqian'
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
							url: 'http://124.70.192.154:7702/api/other/uploadFile', //仅为示例，非真实的接口地址
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
				// console.log(res);
				if (res.data.code == 200) {
					this.rwList = res.data.data
					// console.log(this.rwList[14].xjjg);
					// for(var i=0;i<this.rwList.length;i++){
					// 	console.log(this.rwList[i].xjjg);
					// 	if(this.rwList[i].xjjg == ''){
					// 		this.zgfs[i] = '已检查无隐患'
					// 	}
					// 	if(this.rwList[i].xjjg == '0'){
					// 			this.zgfs[i] = '隐患整改通知'
					// 	}
					// 	if(this.rwList[i].xjjg == '1'){
					// 		this.zgfs[i] = '已检查无隐患'
					// 	}
					// 	if(this.rwList[i].xjjg == '2'){
					// 		this.zgfs[i] = '现场立即整改'
					// 	}
						
					// }
					// console.log(JSON.stringify(this.bmobj));
					
				}
			},
			bindPickerChange1: function(e) {
			            console.log('picker发送选择改变，携带值为1111', e.target.value)
			            this.fjindex = e.target.value
						console.log(this.fjindex);
						var path = 'http://124.70.192.154:7703/img/'+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid
						console.log(path);
						plus.runtime.openURL("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent(path));
						// window.open("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent(path));
						
			        },
			bindPickerChange(e) {
				
				var ind = e.detail.value
				
				this.rwList[this.findex].xjjg = ind
				
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
			zgfsClick(index){
				// this.zgfsIndex = index
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
