<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">操作规程名称:</view>
			<input name="input" v-model="dataList.czgcmc" :disabled="up"></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">发布单位:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayfbdw" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.fbdw}}</view>
			</picker>
		</view> -->
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">发布单位:</view>
			<view class="uni-input" style="">{{dataList.fbdw}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayfbdw" @confirm="confirm" :disabled="up"></u-select>
		</view>
		<view class="cu-form-group">
			<view class="title">最后修订日期:</view>
			<input name="input" v-model="dataList.zxxdrq" disabled="" @click="calendar"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">操作规程简介:</view>
			<input name="input" v-model="dataList.czgcjj" :disabled="up"></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='dataList.bz' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChanges" :value="fjindex" :range="fj">
				<view class="uni-input">{{fj[fjindex]}}</view>
			</picker>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj" disabled=""></input>
		</view> -->
		<view class="" style="display: flex;justify-content: space-around;margin-top: 50rpx;">
			<button type="primary" size="mini"  @click="up = false" :disabled="!up">修改</button>
			<button type="primary" size="mini"  @click="updataGc">确定</button>
		</view>
		
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
				up:true,
				index:0,
				show:false,
				mode:'date',
				czgc:'',
				xdrq:'',
				gcjj:'',
				bz:'',
				fj:'',
				arrayfbdw:['安全部','财务部'],
				dataList:{
					docid:'',
					appid:'C1CFC5AAAE7C4E688634E432E9D2F6A2',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'操作规程登记',
					pribeanname:'com.ruoyi.aqgl.tzzl.AqFxglAqczgc',
					czgcmc:'',
					fbdw:'',
					zxxdrq:'',
					czgcjj:'',
					bz:''
				}
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		async onShow() {
			this.fj = []
			this.fjs = []
			//获取附件列表
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getFile',
				data:{docid:this.dataList.docid}
			})
			console.log(JSON.stringify(res));
			for(var i = 0;i<res.data.data.length;i++){
				
					this.fj.push(res.data.data[i].sfilename)
					this.fjs.push(res.data.data[i])
					
				
			}
			this.arrayfbdw = uni.getStorageSync('arrayBz')
		},
		methods: {
			calendar(){
				if(!this.up){
					this.show = true
				}
			},
			bindPickerChanges: function(e) {
			            console.log('picker发送选择改变，携带值为1111', e.target.value)
			            this.fjindex = e.target.value
						console.log(this.fjindex);
						var path = commonUrl.url2+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid
						console.log(path);
						//#ifdef APP-PLUS
						plus.runtime.openURL(path);
						//#endif
						//#ifdef H5
						window.open(path);
						//#endif
						
			        },
			//修改规程
			async updataGc(){
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
					url: 'api/other/updateRules',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				if(res.data.code == 200){
					uni.navigateTo({
						url:'./caoZuoGuiCheng'
					})
				}
			},
			// bindPickerChange(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index = e.detail.value
			// 	this.dataList.fbdw = this.arrayfbdw[this.index]
			// },
			confirm(e){
				this.dataList.fbdw = e[e.length-1].label
				// this.bmid = e[e.length-1].extra
			},
			change(e){
				console.log(e.result);
				this.dataList.zxxdrq = e.result
			},
		}
	}
</script>

<style>

</style>
