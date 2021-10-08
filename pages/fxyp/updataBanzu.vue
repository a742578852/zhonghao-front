<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">班组:</view>
			<input name="input" v-model="dataList.bz" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报人:</view>
			<input name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true" >
			<view class="content" style="background-color: #bbfeff;font-size: 35rpx;">
				
				<view class="content-item">
					<text>风险研判内容</text>
				</view>
				<view class="content-item">
					<text>标准</text>
				</view>
				<view class="content-itemm" >
					<text>研判情况</text>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>生产装置的温度、压力(真空度)等主要工艺参数</text>
				</view>
				<view class="content-item">
					<text>正常</text>
				</view>
				<view class="content-itemm" >
					<view class="cu-form-group" style="width: 190rpx;">
						<picker @change="bindPickerChange" :value="index" :range="arrayYhqk" class="item2" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk1}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>超限报警、紧急切断、连锁等安全设施</text>
				</view>
				<view class="content-item">
					<text>配套齐全可靠运行</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<picker @change="bindPickerChange1" :value="index1" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk2}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>压力容器、压力管道等特种设备</text>
				</view>
				<view class="content-item">
					<text>定期检测合格</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<picker @change="bindPickerChange2" :value="index2" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk3}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>各项变更审批程序</text>
				</view>
				<view class="content-item">
					<text>符合规定</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<picker @change="bindPickerChange3" :value="index3" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk4}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>储罐或反应器三违液位、温度、压力</text>
				</view>
				<view class="content-item">
					<text>严禁超限运行</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<!-- <view class="title">隐患等级:</view> -->
						<picker @change="bindPickerChange4" :value="index4" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk5}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>储罐区切罐操作、装卸车</text>
				</view>
				<view class="content-item">
					<text>严禁离人</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<!-- <view class="title">隐患等级:</view> -->
						<picker @change="bindPickerChange5" :value="index5" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk6}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>可燃及有毒气体报警和连锁</text>
				</view>
				<view class="content-item">
					<text>可靠运行</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<!-- <view class="title">隐患等级:</view> -->
						<picker @change="bindPickerChange6" :value="index6" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk7}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<view>各项特殊作业</view>
					<view class="" style="display: flex;">
						<view>特殊动火作业数量：</view>
						<input type="text" v-model="dataList.tsdhzycs" :disabled="up" style="width: 60rpx;border: solid 1rpx #b5b3bb;margin-left: 5rpx;border-radius: 10rpx;"/>
					</view>
					<view class="" style="display: flex;">
						<view>一级动火作业数量：</view>
						<input type="text" v-model="dataList.yjdhzycs" :disabled="up" style="width: 60rpx;border: solid 1rpx #b5b3bb;margin-left: 5rpx;border-radius: 10rpx;"/>
					</view>
					<view class="" style="display: flex;">
						<view>二级动火作业数量：</view>
						<input type="text" v-model="dataList.ejdhzycs" :disabled="up" style="width: 60rpx;border: solid 1rpx #b5b3bb;margin-left: 5rpx;border-radius: 10rpx;"/>
					</view>
					<view class="" style="display: flex;">
						<view>受限空间作业数量：</view>
						<input type="text" v-model="dataList.sxkjzycs" :disabled="up" style="width: 60rpx;border: solid 1rpx #b5b3bb;margin-left: 5rpx;border-radius: 10rpx;"/>
					</view>
					<view>特殊作业执行许可证管理</view>
				</view>
				<view class="content-item">
					<text>必须进行风险识别<br>，按计划审批落实</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<picker @change="bindPickerChange7" :value="index7" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk8}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>危化品罐区等重点部位动火作业或受限空间作业</text>
				</view>
				<view class="content-item">
					<text>加严管理</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<picker @change="bindPickerChange8" :value="index8" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk9}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>生产装置(设备、管道)储罐区动火作业或受限作业前的隔离、清洗、蒸煮、吹扫</text>
				</view>
				<view class="content-item">
					<text>可靠落实</text>
				</view>
				<view class="content-itemm">
					<view class="cu-form-group" style="width: 190rpx;">
						<!-- <view class="title">隐患等级:</view> -->
						<picker @change="bindPickerChange9" :value="index9" :range="arrayYhqk" class="item2" style="" :disabled="up">
							<view class="uni-input" style="">{{dataList.ypqk10}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-item" >
					<text>班组承诺</text>
				</view>
				<view class="content-item">
					<text>今天我班组以根据岗位风险辨识管控相关内容以及安全风险评估表进行安全风险研判，各项安全风险防控措施已落实到位，我承诺本岗位处于安全运行状态，涉及罐区、仓库等重大危险源安全风险得到有效管控。</text>
					<view class="" style="display: flex;">
						<view>班组负责人：</view>
						<input type="text" v-model="dataList.bzfzr" :disabled="up" style="width: 200rpx;border: solid 1rpx #b5b3bb;margin-left: 5rpx;border-radius: 10rpx;"/>
					</view>
					<view class="" style="display: flex;margin-top: 10rpx;">
						<view>承诺&nbsp&nbsp&nbsp日期：</view>
						<input type="text" v-model="dataList.tbrq" disabled="" @click="calendar" value="" style="width: 200rpx;border: solid 1rpx #b5b3bb;margin-left: 5rpx;border-radius: 10rpx;"/>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
		<view class="" style="display: flex;justify-content: space-around;margin-top: 50rpx;">
			<button type="primary" size="mini"  @click="up = false">修改</button>
			<button type="primary" size="mini"  @click="updataBz">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				up:true,
				show:false,
				mode:'date',
				index:0,
				index1:0,
				index2:0,
				index3:0,
				index4:0,
				index5:0,
				index6:0,
				index7:0,
				index8:0,
				index9:0,
				bz:'',
				tbr:'',
				cnrq:'',
				arrayYhqk:['符合','不符合'],
				old: {
					scrollTop: 0
				},
				dataList:{
					docid:'',
					appid:'33E92C980D644476885526619CCD4305',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'风险研判-班组级',
					pribeanname:'com.ruoyi.aqgl.fxgl.models.Fxypbzj',
					bz:'',
					ypqk1:'符合',
					ypqk2:'符合',
					ypqk3:'符合',
					ypqk4:'符合',
					ypqk5:'符合',
					ypqk6:'符合',
					ypqk7:'符合',
					ypqk8:'符合',
					ypqk9:'符合',
					ypqk10:'符合',
					tsdhzycs: "",
				    yjdhzycs: "",
				    ejdhzycs: "",
				    sxkjzycs: "",
					tbrq:'',
					bzfzr:''
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./banZuYanPan'
			})
			return true;
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		methods: {
			calendar(){
				if(!this.up){
					this.show = true
				}
			},
			//修改班组
			async updataBz(){
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
					url: 'api/judge/updateYpBz',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./banZuYanPan'
					})
				}
			},
			change(e){
				console.log(e.result);
				this.dataList.tbrq = e.result
			},
			 bindPickerChange(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index = e.detail.value
			 				this.dataList.ypqk1 = this.arrayYhqk[this.index]
			 },
			 bindPickerChange1(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index1 = e.detail.value
			 				this.dataList.ypqk2 = this.arrayYhqk[this.index1]
			 },
			 bindPickerChange2(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index2 = e.detail.value
			 				this.dataList.ypqk3 = this.arrayYhqk[this.index2]
			 },
			 bindPickerChange3(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index3 = e.detail.value
			 				this.dataList.ypqk4 = this.arrayYhqk[this.index3]
			 },
			 bindPickerChange4(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index4 = e.detail.value
			 				this.dataList.ypqk5 = this.arrayYhqk[this.index4]
			 },
			 bindPickerChange5(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index5 = e.detail.value
			 				this.dataList.ypqk6 = this.arrayYhqk[this.index5]
			 },
			 bindPickerChange6(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index6 = e.detail.value
			 				this.dataList.ypqk7 = this.arrayYhqk[this.index6]
			 },
			 bindPickerChange7(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index7 = e.detail.value
			 				this.dataList.ypqk8 = this.arrayYhqk[this.index7]
			 },
			 bindPickerChange8(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index8 = e.detail.value
			 				this.dataList.ypqk9 = this.arrayYhqk[this.index8]
			 },
			 bindPickerChange9(e) {
			 	console.log('picker发送选择改变，携带值为', e.target.value)
			 	this.index9 = e.detail.value
			 				this.dataList.ypqk10 = this.arrayYhqk[this.index9]
			 },
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeedf1;
	}
	.scroll-view_H {
		// white-space: nowrap;
		.content {
			width: 125%;
			margin-bottom: 10rpx;
			padding-bottom: 10rpx;
			padding-top: 10rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.content-item {
				width: 40%;
				margin-left: 10rpx;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				align-items: center;
				// white-space: pre-wrap;

			}
			.content-itemm {
				width: 20%;
			}
		}
	}
</style>
