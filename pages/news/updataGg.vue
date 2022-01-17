<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">标题:</view>
			<input name="input" v-model="news.bt" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">发布状态:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayZt" class="item2" style="" disabled="">
				<view class="uni-input" style="">发布</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">限期:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayZt" class="item2" style="" disabled="">
				<view class="uni-input" style="">否</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">发布日期:</view>
			<input name="input" v-model="news.fbrq" disabled="" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">截止日期:</view>
			<input name="input" v-model="news.fbrq" disabled="" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">发布部门:</view>
			<input name="input" v-model="news.authororgname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">发布人:</view>
			<input name="input" v-model="news.authorname" disabled=""></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">公告内容:</view>
			<textarea  maxlength="-1"  v-model='news.apptznr' auto-height="true" disabled></textarea>
		</view>
		<!-- <view class="cu-form-group" @click="chooseImage">
			<view class="title">附件:</view>
			<image :src="imgUrl" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view> -->
		<!-- <button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="">确定</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'',
				show:false,
				mode:'date',
				index:1,
				arrayZt:['发布','拟稿'],
				bt:'',
				fbrq:'',
				fbbm:'',
				fbr:'',
				xwnr:'',
				news:[]
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./gonggao'
			})
			return true;
		},
		onLoad(option) {
			this.news = JSON.parse(option.items)
			// this.news.apptznr = this.news.apptznr.replace(/[\r\n]/g,"")
			console.log(JSON.parse(option.items))
			this.index = this.news.sffb
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgUrl = res.tempFilePaths[0]
					}
				})
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
			},
			change(e){
				console.log(e.result);
				this.fbrq = e.result
			},
		}
	}
</script>

<style>

</style>
