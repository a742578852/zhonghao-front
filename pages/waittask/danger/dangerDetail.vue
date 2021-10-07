<template>
	
	<view>
		<l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<u-calendar v-model="show1" :mode="mode" @change="change1"></u-calendar>
		<u-calendar v-model="show2" :mode="mode" @change="change2"></u-calendar>
		<u-calendar v-model="show3" :mode="mode" @change="change3"></u-calendar>
		<u-calendar v-model="show4" :mode="mode" @change="change4"></u-calendar>
		<u-calendar v-model="show5" :mode="mode" @change="change5"></u-calendar>
		<view class="cu-form-group align-start">
			<view class="title">隐患问题:</view>
			<textarea maxlength="-1" v-model='yhwt'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">发起人:</view>
			<input name="input" v-model="fqr" disabled=""></input>
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
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">责任部门:</view>
			<view class="uni-input" style="">{{bm}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="bmlist" @confirm="confirm"></u-select>
		</view>
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">检查单位:</view>
			<view class="uni-input" style="">{{jcdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="bmlist" @confirm="jcdwMe"></u-select>
		</view>
		<view class="cu-form-group" @click="openzgqfile">
			<view class="title">整改前照片:</view>
			<view style="color: #007AFF;">{{zgqfile}}</view>
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


		<view class=""
			style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>组织整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改措施:</view>
			<textarea maxlength="-1" v-model='zgcs'></textarea>
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
		<view class=""
			style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改情况:</view>
			<textarea maxlength="-1" v-model='zgqk'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">整改人:</view>
			<input name="input" v-model="zgr"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">整改完成日期:</view>
			<input name="input" v-model="zgwcrq" disabled="" @click="show2 = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">治理资金(元):</view>
			<input name="input" v-model="zlzj"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="txrq" disabled="" @click="show4 = true"></input>
		</view>
		<view class="cu-form-group" @click="openzgfile">
			<view class="title">整改后照片:</view>
				<view style="color: #007AFF;">{{zgfile}}</view>
		</view>
		<view class=""
			style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
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
			<input name="input" v-model="yzr"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="txrq1" disabled="" @click="show5 = true"></input>
		</view>
		<view class="cu-form-group" @click="openyzfile">
			<view class="title">验证照片:</view>
				<view style="color: #007AFF;">{{yzfile}}</view>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">验证情况:</view>
			<textarea maxlength="-1" v-model='yzqk'></textarea>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="">日志</button>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="">流转</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F00%2F07%2F155788a6d8a5c42.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619847627&t=2da40b583002205c204d980b54b35040',
				bmshow: false,
				//部门
				bm: '',
				//部门id
				bmid:'',
				bmlist: [],
				//检查单位
				jcdw:'',
				//检查单位id
				jcdwid:'',
				//整改前文件名
				zgqfile:'',
				//整改前文件显示名
				zgqfileo:'',
				//整改文件
				zgfile:'',
				//整改文件显示名
				zgfileo:'',
				//验证文件名
				yzfile:'',
				//验证文件显示名
				yzfileo:'',
				item: '',
				mode: 'date',
				show: false,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				//整改前文件路径
				imgUrl: '',
				//整改文件路径
				imgUrl1: '',
				//验证文件路径
				imgUrl2: '',
				
				yhwt: '',
				fqr: '',
				jcr: '',
				jcrq: '',
				zgcs: '',
				zgqx: '',
				tbr: '',
				tbrq: '',
				zgqk: '',
				zgr: '',
				zgwcrq: '',
				zlzj: '',
				txrq: '',
				yzr: '',
				txrq1: '',
				yzqk: '',
				index: 0,
				index1: 0,
				index2: 0,
				index3: 0,
				index4: 0,
				index5: 0,
				index6: 0,
				index7: 0,
				arrayYhdj: ['一般隐患', '重大隐患'],
				arrayjccj: ['班组级', '部门级', '公司级'],
				arrayjclx: ['日常检查', '综合性检查', '专业性检查', '季节性检查', '重大活动及节假日前检查', '事故类比检查', '上级公司检查', '政府执法检查', '重大危险源检查'],
				arrayzrbm: ['安全部', '财务部'],
				arrayjcdw: ['安全部', '财务部'],
				arrayBz: ['安全部', '财务部'],
				arrayYy: ['人', '物', '料', '法', '环']
			}
		},
		methods: {
			onSuccess(res) {
				console.log('上传成功回调',JSON.stringify(res));
				uni.showToast({
					title: JSON.stringify(res),
					icon: 'none'
				})
			},
			//打开整改前文件
			openzgqfile(){
				if(this.zgqfile != null){
					window.open("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent('http://'+this.imgUrl));
				}
				
			},
			openzgfile(){
				if(this.zgfile != null){
					window.open("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent('http://'+this.imgUrl1));
					
				}
			},
			openyzfile(){
				if(this.yzfile != null){
					window.open("https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent('http://'+this.imgUrl2));
					
				}
			},
			jcdwMe(e){
				this.jcdw = e[e.length-1].label
				this.jcdwid = e[e.length-1].extra
			},
			confirm(e){
				console.log(JSON.stringify(e));
				this.bm = e[e.length-1].label
				this.bmid = e[e.length-1].extra
			},
			
			change(e) {
				console.log(e.result);
				this.jcrq = e.result
			},
			change1(e) {
				console.log(e.result);
				this.zgqx = e.result
			},
			change2(e) {
				console.log(e.result);
				this.zgwcrq = e.result
			},
			change3(e) {
				console.log(e.result);
				this.tbrq = e.result
			},
			change4(e) {
				console.log(e.result);
				this.txrq = e.result
			},
			change5(e) {
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
		},

		async onShow() {
			const dept = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getAllDept',
			})
			this.bmlist = dept.data.data
		

			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/danger/getDangerById',
				data: {
					docid: this.item.docuuid
				}
			})
			if (res.data.data != null) {
				//赋值
				this.yhwt = res.data.data.bhgys
				//发起人
				this.fqr = res.data.data.authorname
				//隐患等级
				// this.arrayYhdj = res.data.data.yhdj
				for (var i = 0; i < this.arrayYhdj.length; i++) {
					if (this.arrayYhdj[i] == res.data.data.yhdj) {
						this.index = i
					}
				}
				//检查层级
				for (var i = 0; i < this.arrayjccj.length; i++) {
					if (this.arrayjccj[i] == res.data.data.jccj) {
						this.index1 = i
					}
				}
				//检查类型
				for (var i = 0; i < this.arrayjclx.length; i++) {
					if (this.arrayjclx[i] == res.data.data.jclx) {
						this.index2 = i
					}
				}
				//责任部门
				this.bm = res.data.data.zrbmmc
				//检查单位
				this.jcdw = res.data.data.jcdwmc
				//检查人
				this.jcr = res.data.data.jcry
				//检查日期
				this.jcrq = res.data.data.fxrq
				//检查区域
				
				
				//整改前照片
				const file = await this.$myRequest({
					method: 'POST',
					url: 'api/other/getFile',
					data: {
						docid: this.item.docuuid
					}
				})
				var files = file.data.data
				var ip = uni.getStorageSync('address')+'/profile/'
				if(files != null){
					for(var i = 0;i<files.length;i++){
						if(files[i].attachtype == 'fileinput-yhzp'){
							this.imgUrl = ip+files[i].filepath+'/'+files[i].attachmentid
							this.zgqfile = files[i].sfilename
							this.zgqfileo = files[i].attachmentid
						}else if(files[i].attachtype == 'fileinput-zgzp'){
							this.imgUrl1 = ip+files[i].filepath+'/'+files[i].attachmentid
							this.zgfile = files[i].sfilename
							this.zgfileo = files[i].attachmentid
						}else if(files[i].attachtype == 'fileinput-yzzp'){
							this.imgUrl2 = ip+files[i].filepath+'/'+files[i].attachmentid
							this.yzfile = files[i].sfilename
							this.yzfileo = files[i].attachmentid
						}
					}
				}
			
				
				
				


			} else {
				//返回
				uni.showToast({
					title: '当前页面数据或已被删除',
					duration:3000
				})
				// uni.navigateTo({
				// 	url: '../waitTask'
				// })

			}
			// this.yhwt = res.data.data.bhgys
		},
		onLoad(item) {
			if (item.item != null) {
				this.item = JSON.parse(item.item)

				console.log(this.item.title);

			}

		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
</style>
