<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<u-calendar v-model="show1" :mode="mode" @change="change1"></u-calendar>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>辨识部位:</view>
			<input name="input" type="text" v-model="aqFxglAqfxfjgktz.bsbw" :disabled="up"></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">存在风险:</view>
			<textarea maxlength="-1"  v-model='aqFxglAqfxfjgktz.czfx':disabled="up"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">依据:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.yj" :disabled="up"></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">创建时间:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.createtime" disabled="" @click="show = true"></input>
		</view> -->
		<view class="cu-form-group">
			<view class="title">事故类型:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.sglx" :disabled="up"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">风险等级:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.fxdj" :disabled="up"></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">主要管控措施:</view>
			<textarea maxlength="-1"  v-model='aqFxglAqfxfjgktz.zygkcs' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">责任部门/责任人:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.zrbmzrr" :disabled="up"></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">最后修改时间:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.lastmodifiedtime" disabled="" @click="show1 = true"></input>
		</view> -->
		<u-toast ref="uToast" />
		<view class="" style="display: flex;justify-content: space-around;margin-top: 50rpx;">
			<button type="primary" size="mini"  @click="up = false" :disabled="!up">修改</button>
			<button type="primary" size="mini"  @click="toFxgk">确定</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				up:true,
				show:false,
				show1:false,
				mode:'date',
				
				aqFxglAqfxfjgktz:{
					docid:'',
					appid:'31A3C67A30E14B78895ED589EC1876A6',
					yj:'',
					createtime:'',
					bsbw:'',
					czfx:'',
					sglx:'',
					fxdj:'',
					zygkcs:'',
					zrbmzrr:'',
					lastmodifiedtime:''
				}
				
			}
		},
		onLoad(option) {
			this.aqFxglAqfxfjgktz = JSON.parse(option.items)
		},
		
		methods: {
			change(e){
				console.log(e.result);
				this.cjsj = e.result
			},
			change1(e){
				console.log(e.result);
				this.zhxgsj = e.result
			},
			async toFxgk(){
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
				this.aqFxglAqfxfjgktz.lastmodifiedtime = time
				var token = uni.getStorageSync('token')
				if(this.aqFxglAqfxfjgktz.bsbw.replace(/\s+/g,'') == ''||this.aqFxglAqfxfjgktz.bsbw.replace(/\s+/g,'') == null){
					this.$refs.uToast.show({
						title: '请填写必填项！',
					})
				}else{
					const res = await this.$myRequest({
						method: 'POST',
						url: 'api/risk/updateRiskInfo',
						header:{
							'content-type': 'application/json;charset=utf-8',
							'token': token
						},
						data: JSON.stringify(this.aqFxglAqfxfjgktz)
						
					})
					console.log(res);
					if(res.data.code == 200){
						uni.navigateTo({
							url:'./fxgk'
						})
					}else{
						uni.showToast({
							title:res.data.message
						})
					}
					
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
</style>
