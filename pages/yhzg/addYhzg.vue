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
			<input name="input" v-model="dataList.jcry" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检查日期:</view>
			<input name="input" v-model="dataList.yhxxjcrq" disabled="" @click="show = true"></input>
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
			<textarea maxlength="-1"  v-model='dataList.yhzgqk'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>整改期限:</view>
			<input name="input" v-model="dataList.zzzgzgqx" disabled="" @click="show1 = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报人:</view>
			<input name="input" v-model="dataList.zzzgtbr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报日期:</view>
			<input name="input" v-model="dataList.zzzgtxrq" disabled="" @click="show3 = true"></input>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改情况:</view>
			<textarea maxlength="-1"  v-model='dataList.wtyzzgqk'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">整改人:</view>
			<input name="input" v-model="dataList.zgr" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">整改完成日期:</view>
			<input name="input" v-model="dataList.zgwcrq" disabled="" @click="show2 = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">治理资金(元):</view>
			<input name="input" v-model="dataList.zlzj" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.zgrtxrq" disabled="" @click="show4 = true"></input>
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
			<input name="input" v-model="dataList.yzr" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.yzrtxrq" disabled="" @click="show5 = true"></input>
		</view>
		<view class="cu-form-group" @click="chooseImage2">
			<view class="title">验证照片:</view>
			<image :src="imgUrl2" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">验证情况:</view>
			<textarea maxlength="-1"  v-model='dataList.yzqk'></textarea>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="addYh">确定</button>
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
				dataList:{
					docid:'',
					appid:'E45FFBBEC8C94B3CA3D453389AFD83C6',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'整改通知流程',
					pribeanname:'com.ruoyi.aqgl.jcyzg.models.Zgtz',
					bhgys:'',//隐患问题
					yhdj:'一般隐患',//隐患等级
					jccj:'班组级',//检查层级
					jclx:'日常检查',//检查类型
					jcdwmc:'安全部',//检查单位
					zrbmmc:'安全部',//责任部门
					jcry:'',//检查人
					zywzdw:'安全部',//检查区域
					zywzqymc:'安全部',//详细区域
					yhxxjcrq:'',//检查日期
					
					zzzgtbr:'',//整改填报人
					zzzgtxrq:'',//整改填报日期
					zzzgzgqx:'',//整改期限
					yhzgqk:'',//整改措施
					
					zgwcrq:'',//整改完成日期
					zgr:'',//整改人
					zgrtxrq:'',//整改填写日期
					zlzj:'',//治理资金
					wtyzzgqk:'',//整改情况
					
					wtyzyyfx:'人',//原因分析
					yzr:'',//验证人
					yzrtxrq:'',//验证填写日期
					yzqk:'',//验证情况
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./yhzg'
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
			this.dataList.yhxxjcrq = time
			this.dataList.createtime = time
			
			var admin = uni.getStorageSync('admin')
			this.dataList.authorname = admin.userName
			this.dataList.authorid = admin.userId
		},
		methods: {
			async addYh(){
				this.dataList.docid = this.guid2()
				console.log(this.dataList.docid);
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/insertDanger',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				console.log(res);
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./yhzg'
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
				this.dataList.yhxxjcrq = e.result
			},
			change1(e){
				console.log(e.result);
				this.dataList.zzzgzgqx = e.result
			},
			change2(e){
				console.log(e.result);
				this.dataList.zgwcrq = e.result
			},
			change3(e){
				console.log(e.result);
				this.dataList.zzzgtxrq = e.result
			},
			change4(e){
				console.log(e.result);
				this.dataList.zgrtxrq = e.result
			},
			change5(e){
				console.log(e.result);
				this.dataList.yzrtxrq = e.result
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.yhdj = this.arrayYhdj[this.index]
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.detail.value
				this.dataList.jccj = this.arrayjccj[this.index1]
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.detail.value
				this.dataList.jclx = this.arrayjclx[this.index2]
			},
			bindPickerChange3(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index3 = e.detail.value
				this.dataList.zrbmmc = this.arrayzrbm[this.index3]
			},
			bindPickerChange4(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index4 = e.detail.value
				this.dataList.jcdwmc = this.arrayjcdw[this.index4]
			},
			bindPickerChange5(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index5 = e.detail.value
				this.dataList.zywzdw = this.arrayBz[this.index5]
			},
			bindPickerChange6(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index6 = e.detail.value
				this.dataList.zywzqymc = this.arrayBz[this.index6]
			},
			bindPickerChange7(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index7 = e.detail.value
				this.dataList.wtyzyyfx = this.arrayYy[this.index7]
			},
		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
</style>
