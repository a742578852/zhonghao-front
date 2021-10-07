<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>辨识部位:</view>
			<input name="input" type="text" v-model="aqFxglAqfxfjgktz.bsbw" ></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">存在风险:</view>
			<textarea maxlength="-1"  v-model='aqFxglAqfxfjgktz.czfx'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">事故类型:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.sglx" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">风险等级:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.fxdj" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">依据:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.yj" ></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">创建时间:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.createtime" disabled="" @click="show = true"></input>
		</view> -->
		<view class="cu-form-group align-start">
			<view class="title">主要管控措施:</view>
			<textarea maxlength="-1"  v-model='aqFxglAqfxfjgktz.zygkcs'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">责任部门/责任人:</view>
			<input name="input" v-model="aqFxglAqfxfjgktz.zrbmzrr" ></input>
		</view>
		<u-toast ref="uToast" />
		<button type="primary"  style="width: 40%;margin-top: 20rpx;" @click="toFxgk">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
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
				}
				
			}
		},
		
		methods: {
			//生成uuid
			guid2() {
			    function S4() {
			        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			    }
			    return (S4() + S4() +  S4() +  S4() +  S4() +  S4() + S4() + S4());
			},
			change(e){
				this.aqFxglAqfxfjgktz.createtime = e.result
			},
			async toFxgk(){
				//获取当前时间
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				// let hour = date.getHours();
				// let minute = date.getMinutes();
				// let second = date.getSeconds();
				if(month < 10){
					month = '0' + month;
				}
				if(day < 10){
					day = '0' + day;
				}
				
				var time = year+'-' + month+'-' + day
				this.aqFxglAqfxfjgktz.createtime = time
				var token = uni.getStorageSync('token')
				this.aqFxglAqfxfjgktz.docid = this.guid2()
				if(this.aqFxglAqfxfjgktz.bsbw.replace(/\s+/g,'') == ''||this.aqFxglAqfxfjgktz.bsbw.replace(/\s+/g,'') == null){
					this.$refs.uToast.show({
						title: '请填写必填项！',
					})
				}else{
					const res = await this.$myRequest({
						method: 'POST',
						url: 'api/risk/insertRiskInfo',
						header:{
							'content-type': 'application/json;charset=utf-8',
							'token': token
						},
						data: JSON.stringify(this.aqFxglAqfxfjgktz)
						
					})
					if(res.data.code == 200){
						uni.navigateTo({
							url:'./fxgk'
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
