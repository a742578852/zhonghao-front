<template>
	<view>
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<view class="cu-form-group">
			<view class="title">文件号:</view>
			<input name="input" v-model="wjh"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">文件:</view>
			<input name="input" v-model="wj"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">印发日期:</view>
			<input name="input" v-model="yfrq" disabled="" @click="show = true"></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='bz'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj"></input>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				mode:'date',
				wjh:'',
				wj:'',
				yfrq:'',
				bz:'',
				fj:''
			}
		},
		methods: {
			change(e){
				console.log(e.result);
				this.yfrq = e.result
			},
		}
	}
</script>

<style>

</style>
