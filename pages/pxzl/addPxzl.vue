<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">标题:</view>
			<input name="input" v-model="bt" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">所属类别:</view>
			<input name="input" v-model="lb" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">上传人:</view>
			<input name="input" v-model="scr" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">上传时间:</view>
			<input name="input" v-model="scsj"  @click="show = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关键字:</view>
			<input name="input" v-model="gjz" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">文件类型:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayLx" class="item2" style="">
				<view class="uni-input" style="">{{arrayLx[index]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">教程简介:</view>
			<input name="input" v-model="jcjj" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">视频播放:</view>
			<input name="input" v-model="spbf" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj" disabled=""></input>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				show:false,
				mode:'date',
				scsj:'',
				bt:'',
				lb:'',
				scr:'',
				gjz:'',
				jcjj:'',
				spbf:'',
				fj:'',
				arrayLx:['文档','视频','语音','其他']
			}
		},
		methods: {
			change(e){
				console.log(e.result);
				this.scsj = e.result
			},
		}
	}
</script>

<style>

</style>
