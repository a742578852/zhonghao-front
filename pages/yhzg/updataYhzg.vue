<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<u-calendar v-model="show1" :mode="mode" @change="change1"></u-calendar>
		<u-calendar v-model="show2" :mode="mode" @change="change2"></u-calendar>
		<u-calendar v-model="show3" :mode="mode" @change="change3"></u-calendar>
		<u-calendar v-model="show4" :mode="mode" @change="change4"></u-calendar>
		<u-calendar v-model="show5" :mode="mode" @change="change5"></u-calendar>
		<view class="cu-form-group align-start">
			<view class="title">隐患问题:</view>
			<textarea maxlength="-1"  v-model='dataList.bhgys'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">发起人:</view>
			<input name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">隐患等级:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayYhdj" class="item2" style="">
				<view class="uni-input" style="">{{arrayYhdj[index]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查层级:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arrayjccj" class="item2" style="">
				<view class="uni-input" style="">{{arrayjccj[index1]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查类型:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayjclx" class="item2" style="">
				<view class="uni-input" style="">{{arrayjclx[index2]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">责任部门:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayzrbm" class="item2" style="">
				<view class="uni-input" style="">{{arrayzrbm[index3]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查单位:</view>
			<picker @change="bindPickerChange4" :value="index4" :range="arrayjcdw" class="item2" style="">
				<view class="uni-input" style="">{{arrayjcdw[index4]}}</view>
			</picker>
		</view>
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">整改前照片:</view>
			<image :src="imgUrl" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<view class="cu-form-group">
			<view class="title">检查人:</view>
			<input name="input" v-model="jcr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检查日期:</view>
			<input name="input" v-model="jcrq" disabled="" @click="show = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检查区域:</view>
			<picker @change="bindPickerChange5" :value="index5" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{arrayBz[index5]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查详细区域:</view>
			<picker @change="bindPickerChange6" :value="index6" :range="arrayBz" class="item2" style="">
				<view class="uni-input" style="">{{arrayBz[index6]}}</view>
			</picker>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>组织整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改措施:</view>
			<textarea maxlength="-1"  v-model='zgcs'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>整改期限:</view>
			<input name="input" v-model="zgqx" disabled="" @click="show1 = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报人:</view>
			<input name="input" v-model="tbr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报日期:</view>
			<input name="input" v-model="tbrq" disabled="" @click="show3 = true"></input>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改情况:</view>
			<textarea maxlength="-1"  v-model='zgqk'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">整改人:</view>
			<input name="input" v-model="zgr" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">整改完成日期:</view>
			<input name="input" v-model="zgwcrq" disabled="" @click="show2 = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">治理资金(元):</view>
			<input name="input" v-model="zlzj" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="txrq" disabled="" @click="show4 = true"></input>
		</view>
		<view class="cu-form-group" @click="chooseImage1">
			<view class="title">整改后照片:</view>
			<image :src="imgUrl1" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题验证</text>
		</view>
		<view class="cu-form-group">
			<view class="title">原因分析:</view>
			<picker @change="bindPickerChange7" :value="index7" :range="arrayYy" class="item2" style="">
				<view class="uni-input" style="">{{arrayYy[index7]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">验证人:</view>
			<input name="input" v-model="yzr" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="txrq1" disabled="" @click="show5 = true"></input>
		</view>
		<view class="cu-form-group" @click="chooseImage2">
			<view class="title">验证照片:</view>
			<image :src="imgUrl2" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">验证情况:</view>
			<textarea maxlength="-1"  v-model='yzqk'></textarea>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode:'date',
				show:false,
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				show5:false,
				imgUrl:'',
				imgUrl1:'',
				imgUrl2:'',
				yhwt:'',
				fqr:'',
				jcr:'',
				jcrq:'',
				zgcs:'',
				zgqx:'',
				tbr:'',
				tbrq:'',
				zgqk:'',
				zgr:'',
				zgwcrq:'',
				zlzj:'',
				txrq:'',
				yzr:'',
				txrq1:'',
				yzqk:'',
				index:0,
				index1:0,
				index2:0,
				index3:0,
				index4:0,
				index5:0,
				index6:0,
				index7:0,
				arrayYhdj:['一般隐患','重大隐患'],
				arrayjccj:['班组级','部门级','公司级'],
				arrayjclx:['日常检查','综合性检查','专业性检查','季节性检查','重大活动及节假日前检查','事故类比检查','上级公司检查','政府执法检查','重大危险源检查'],
				arrayzrbm:['安全部','财务部'],
				arrayjcdw:['安全部','财务部'],
				arrayBz:['安全部','财务部'],
				arrayYy:['人','物','料','法','环'],
				dataList:[]
			}
			
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		methods: {
			//上传整改前照片
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgUrl = res.tempFilePaths[0]
					}
				})
			},
			//上传整改后照片
			chooseImage1() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgUrl1 = res.tempFilePaths[0]
					}
				})
			},
			//上传验证照片
			chooseImage2() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgUrl2 = res.tempFilePaths[0]
					}
				})
			},
			change(e){
				console.log(e.result);
				this.jcrq = e.result
			},
			change1(e){
				console.log(e.result);
				this.zgqx = e.result
			},
			change2(e){
				console.log(e.result);
				this.zgwcrq = e.result
			},
			change3(e){
				console.log(e.result);
				this.tbrq = e.result
			},
			change4(e){
				console.log(e.result);
				this.txrq = e.result
			},
			change5(e){
				console.log(e.result);
				this.txrq1 = e.result
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.detail.value
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.detail.value
			},
			bindPickerChange3(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index3 = e.detail.value
			},
			bindPickerChange4(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index4 = e.detail.value
			},
			bindPickerChange5(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index5 = e.detail.value
			},
			bindPickerChange6(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index6 = e.detail.value
			},
			bindPickerChange7(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index7 = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
</style>
